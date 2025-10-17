import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../common/services/prisma.service';
import { Result } from '../common/result/result';
import { Prisma } from 'generated/prisma';

type ProductWithImages = Prisma.ProductGetPayload<{
  include: { images: true };
}>;

@Injectable()
class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createProductDto: CreateProductDto,
    files: Array<Express.Multer.File>,
  ): Promise<Result<ProductWithImages>> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // 1️⃣ Subir imágenes a Cloudinary
        // const uploadResults = await Promise.allSettled(
        //   files.map((file) => this.cloudinaryService.uploadImage(file)),
        // );

        // 2️⃣ Filtrar imágenes que se subieron correctamente
        // const uploadedImages = uploadResults
        //   .filter(
        //     (res): res is PromiseFulfilledResult<{ url: string }> =>
        //       res.status === 'fulfilled',
        //   )
        //   .map((res) => res.value.url);

        // 3️⃣ Validar que haya al menos una imagen subida
        // if (uploadedImages.length === 0) {
        //   throw new BadRequestException('Failed to upload all product images');
        // }

        // 4️⃣ Crear el producto

        console.log('files: ', files);
        const product = await tx.product.create({
          data: {
            ...createProductDto,
            slug: this.toSlug(createProductDto.name),
          },
        });

        // 5️⃣ Crear registros en productImage para las imágenes subidas
        // await tx.productImage.createMany({
        //   data: uploadedImages.map((url) => ({
        //     url,
        //     productId: product.id,
        //   })),
        // });

        // 6️⃣ Retornar el producto con sus imágenes
        const productCreated = await tx.product.findUnique({
          where: { id: product.id },
          include: { images: true },
        });

        if (!productCreated) {
          return Result.err(
            new BadRequestException('There was an error creating the product'),
          );
        }

        return Result.ok(productCreated);
      });
    } catch (e) {
      return Result.err(this.handlePrismaError(e));
    }

    // return fromPromise(
    //   this.prisma.$transaction(async (tx) => {
    //     return tx.product.findUnique({
    //       where: { id: "abc" }
    //     });
    //   }),
    // );
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
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

  handlePrismaError(error: unknown): HttpException {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002': {
          const field = (error.meta?.target as string[])?.[0] || 'field';
          return new ConflictException(
            `A record with this ${field} already exists`,
          );
        }
        case 'P2003': {
          return new BadRequestException(
            `Invalid reference: ${error.meta?.field_name ?? 'unknown field'}`,
          );
        }
        default:
          return new InternalServerErrorException(
            `Database error [${error.code}]`,
          );
      }
    }
    return new InternalServerErrorException('Internal server error');
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
