import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../common/services/prisma.service';
import { CloudinaryService } from '../common/services/cloudinary.service';
import { UploadApiResponse } from 'cloudinary';
import { ResponseProductDto } from './dto/response-product.dto';
import { Paginated } from '../common/interfaces/paginate.interface';
import { productsInitialData } from './data/data';
import { isUUID } from 'class-validator';
import { Prisma } from 'generated/prisma';
import { FiltersProductDto } from './dto/filters-product.dto';

type Product = Prisma.ProductGetPayload<{ include: { images: true } }>;
type UploadedImages = { url: string; publicId: string }[];
type MulterFiles = Array<Express.Multer.File>;

@Injectable()
class ProductsService {
  private logger = new Logger(ProductsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async seed() {
    try {
      await this.prisma.product.deleteMany();

      for (let product of productsInitialData) {
        await this.prisma.product.create({
          data: {
            ...product,
            slug: this.toSlug(product.name),
          },
        });
      }

      this.logger.debug(
        `Seeding completed. ${productsInitialData.length} products created.`,
      );
    } catch (error) {
      throw error;
    }
  }

  async create(
    createProductDto: CreateProductDto,
    files: MulterFiles,
  ): Promise<ResponseProductDto> {
    const uploadedImages = await this.insertImagesToCloudinary(files);

    try {
      const productCreated: Product = await this.prisma.product.create({
        data: {
          ...createProductDto,
          slug: this.toSlug(createProductDto.name),
          images: {
            create: uploadedImages.map((image) => ({
              url: image.url,
              publicId: image.publicId,
            })),
          },
        },
        include: {
          images: true,
        },
      });

      return this.buildProductResponse(productCreated);
    } catch (error) {
      this.logger.error(
        `Error creating product. Rolling back ${uploadedImages.length} uploaded images`,
        error,
      );
      await this.removeImagesFromCloudinary(uploadedImages);
      throw error;
    }
  }

  async findAll(
    filtersProductDto: FiltersProductDto,
  ): Promise<Paginated<ResponseProductDto>> {
    const {
      page,
      limit,
      status,
      type,
      gender,
      size,
      minPrice,
      maxPrice,
      orderBy,
    } = filtersProductDto;

    console.log(type, gender, size, minPrice, maxPrice, orderBy);

    const where: Prisma.ProductWhereInput = {
      status,
      ...(type && type.length > 0 && { type: { in: type } }),
      ...(gender && gender.length > 0 && { gender: { in: gender } }),
      ...(size && size.length > 0 && { size: { hasSome: size } }),
      ...(minPrice !== undefined || maxPrice !== undefined
        ? {
            price: {
              ...(minPrice !== undefined && { gte: minPrice }),
              ...(maxPrice !== undefined && { lte: maxPrice }),
            },
          }
        : {}),
    };

    const orderByClause = this.buildOrderBy(orderBy);

    const productArgs: Prisma.ProductFindManyArgs = {
      where,
      skip: (page - 1) * limit,
      take: limit,
      ...(orderByClause && { orderBy: orderByClause }),
    };

    try {
      const totalProducts = await this.prisma.product.count({
        where: productArgs.where,
      });
      const products: Product[] = await this.prisma.product.findMany({
        ...productArgs,
        include: { images: true },
      });

      return {
        data: products.map((p: Product) => this.buildProductResponse(p)),
        meta: {
          total: totalProducts,
          page: page,
          limit: limit,
          lastPage: Math.ceil(totalProducts / limit),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(term: string): Promise<ResponseProductDto> {
    const where: Prisma.ProductWhereUniqueInput = isUUID(term)
      ? { id: term }
      : { slug: term };

    try {
      const product: Product = await this.prisma.product.findUniqueOrThrow({
        where,
        include: { images: true },
      });

      return this.buildProductResponse(product);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    files?: Express.Multer.File[],
    imagesToDelete?: string[],
  ): Promise<ResponseProductDto> {
    let uploadedImages: UploadedImages = [];

    try {
      // Sí hay nuevas imágenes, subirlas a cloudinary
      if (files && files.length > 0) {
        uploadedImages = await this.insertImagesToCloudinary(files);
      }

      const product = await this.prisma.$transaction(async (tx) => {
        // Si hay imagines a eliminar, eliminarlas de la BD
        if (imagesToDelete && imagesToDelete.length > 0) {
          await tx.productImage.deleteMany({
            where: {
              productId: id,
              publicId: { in: imagesToDelete },
            },
          });
        }

        // Sí se subieron las nuevas imágenes a cloudinary, crearlas en la BD
        if (uploadedImages.length > 0) {
          await tx.productImage.createMany({
            data: uploadedImages.map(({ url, publicId }) => ({
              productId: id,
              url,
              publicId,
            })),
          });
        }

        // Actualizar el producto en la BD
        return tx.product.update({
          where: { id },
          data: {
            ...updateProductDto,
            ...(updateProductDto.name && {
              slug: this.toSlug(updateProductDto.name),
            }),
          },
          include: { images: true },
        });
      });

      // Sí salió bien, eliminar de Cloudinary
      if (imagesToDelete && imagesToDelete.length > 0) {
        await this.removeImagesFromCloudinary(
          imagesToDelete.map((i) => ({ publicId: i, url: '' })),
        );
      }

      return this.buildProductResponse(product);
    } catch (error) {
      this.logger.error(
        `Error updating product. Rolling back ${uploadedImages.length} uploaded images`,
      );
      await this.removeImagesFromCloudinary(uploadedImages);
      throw error;
    }
  }

  async remove(id: string): Promise<Product> {
    try {
      return await this.prisma.product.delete({
        where: { id },
        include: { images: true },
      });
    } catch (error) {
      throw error;
    }
  }

  private async insertImagesToCloudinary(
    images: MulterFiles,
  ): Promise<UploadedImages> {
    const uploadedImages: UploadedImages = (
      await Promise.allSettled(
        images.map((image) => this.cloudinaryService.uploadImage(image)),
      )
    )
      .filter(
        (res): res is PromiseFulfilledResult<UploadApiResponse> =>
          res.status === 'fulfilled',
      )
      .map(({ value }) => ({
        url: value.secure_url,
        publicId: value.public_id,
      }));

    if (uploadedImages.length < images.length) {
      this.logger.warn(
        `Only ${uploadedImages.length}/${images.length} images were uploaded successfully`,
      );
    }

    return uploadedImages;
  }

  private async removeImagesFromCloudinary(
    uploadedImages: UploadedImages,
  ): Promise<void> {
    if (uploadedImages.length === 0) return;

    const deletePromises = uploadedImages.map(({ publicId }) =>
      this.cloudinaryService.deleteImage(publicId),
    );

    const results = await Promise.allSettled(deletePromises);

    const successCount = results.filter(
      (result) => result.status === 'fulfilled',
    ).length;

    const failedCount = results.length - successCount;

    if (failedCount > 0) {
      this.logger.warn(
        `Failed to delete ${failedCount}/${uploadedImages.length} images from Cloudinary`,
      );
    } else {
      this.logger.debug(
        `Successfully deleted ${successCount} images from Cloudinary`,
      );
    }
  }

  private buildOrderBy(
    orderBy?: string,
  ): Prisma.ProductOrderByWithRelationInput | undefined {
    if (!orderBy) return undefined;

    switch (orderBy) {
      case 'PRICE_ASC':
        return { price: 'asc' };
      case 'PRICE_DESC':
        return { price: 'desc' };
      case 'NEWEST':
        return { createdAt: 'desc' };
      default:
        return undefined;
    }
  }

  private toSlug(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private buildProductResponse(product: Product): ResponseProductDto {
    return {
      ...product,
      price: product.price.toFixed(2),
      images: product.images.map((image) => image.url),
    };
  }
}

export default ProductsService;
