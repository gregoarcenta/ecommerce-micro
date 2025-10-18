import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../common/services/prisma.service';
import { Result } from '../common/result/result';
import { Prisma, Product } from 'generated/prisma';
import { CloudinaryService } from '../common/services/cloudinary.service';
import { UploadApiResponse } from 'cloudinary';

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

  async create(
    createProductDto: CreateProductDto,
    files: MulterFiles,
  ): Promise<Result<Product>> {
    let _uploadedImages: UploadedImages = [];
    try {
      const uploadResults = await Promise.allSettled(
        files.map((file) => this.cloudinaryService.uploadImage(file)),
      );

      _uploadedImages = uploadResults
        .filter(
          (res): res is PromiseFulfilledResult<UploadApiResponse> =>
            res.status === 'fulfilled',
        )
        .map((res) => ({
          url: res.value.secure_url,
          publicId: res.value.public_id,
        }));

      const productCreated = await this.prisma.product.create({
        data: {
          ...createProductDto,
          slug: this.toSlug(createProductDto.name),
          images: {
            create: _uploadedImages.map((image) => ({
              url: image.url,
              publicId: image.publicId,
            })),
          },
        },
      });

      return Result.ok({ ...productCreated, images: _uploadedImages });
    } catch (e) {
      console.log(files.length);
      this.logger.debug(
        `Error creating product | files submitted: ${files.length} | files uploaded: ${_uploadedImages.length}`,
      );
      await this.deleteProductImages(_uploadedImages);
      return Result.err(e);
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

  private async deleteProductImages(
    _uploadedImages: UploadedImages,
  ): Promise<void> {
    if (_uploadedImages.length > 0) {
      const publicIds = _uploadedImages.map((image) => image.publicId);
      const promises = publicIds.map((publicId) =>
        this.cloudinaryService.deleteImage(publicId),
      );
      const deletedResults = await Promise.allSettled(promises);
      const imagesDeletedCount = deletedResults.filter(
        (img) => img.status === 'fulfilled',
      ).length;
      this.logger.debug(
        `Images deleted: ${imagesDeletedCount}/${_uploadedImages.length}`,
      );
    }
  }

  private toSlug(value: string) {
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
