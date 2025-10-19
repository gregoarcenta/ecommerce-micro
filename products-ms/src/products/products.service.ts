import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../common/services/prisma.service';
import { CloudinaryService } from '../common/services/cloudinary.service';
import { productsInitialData } from './data/data';
import { Prisma } from 'generated/prisma';
import { UploadApiResponse } from 'cloudinary';
import { ResponseProductDto } from './dto/response-product.dto';

type ProductWithImages = Prisma.ProductGetPayload<{
  include: { images: true };
}>;
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
      const productCreated = await this.prisma.product.create({
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
      });

      return {
        ...productCreated,
        price: productCreated.price.toFixed(2),
        images: uploadedImages.map((image) => image.url),
      };
    } catch (error) {
      this.logger.error(
        `Error creating product. Rolling back ${uploadedImages.length} uploaded images`,
        error,
      );
      await this.removeImagesFromCloudinary(uploadedImages);
      throw error;
    }
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: number) {
    throw new NotFoundException({
      message: `Product with id ${id} not found`,
    });
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
}

export default ProductsService;
