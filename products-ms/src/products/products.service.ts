import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../common/services/prisma.service';
import { CloudinaryService } from '../common/services/cloudinary.service';
import { UploadApiResponse } from 'cloudinary';
import { ResponseProductDto } from './dto/response-product.dto';
import { PaginateProductDto } from './dto/paginate-product.dto';
import { Paginated } from '../common/interfaces/paginate.interface';
import { productsInitialData } from './data/data';
import { isUUID } from 'class-validator';
import { Prisma, ProductStatus } from 'generated/prisma';

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

    if (uploadedImages.length < files.length) {
      this.logger.warn(
        `Only ${uploadedImages.length}/${files.length} images were uploaded successfully`,
      );
    }

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
    paginateProductDto: PaginateProductDto,
  ): Promise<Paginated<ResponseProductDto>> {
    const { page, limit } = paginateProductDto;

    const productArgs: Prisma.ProductFindManyArgs = {
      where: { status: ProductStatus.PUBLISHED },
      skip: (page - 1) * limit,
      take: limit,
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
          page: paginateProductDto.page,
          limit: paginateProductDto.limit,
          lastPage: Math.ceil(totalProducts / paginateProductDto.limit),
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

    where.status = ProductStatus.PUBLISHED;

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

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  private async insertImagesToCloudinary(
    images: MulterFiles,
  ): Promise<UploadedImages> {
    return (
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
  }

  private async removeImagesFromCloudinary(
    uploadedImages: UploadedImages,
  ): Promise<void> {
    if (uploadedImages.length > 0) return;

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
