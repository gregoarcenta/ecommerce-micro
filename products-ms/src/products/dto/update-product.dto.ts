import { CreateProductDto } from './create-product.dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { ProductStatus } from 'generated/prisma';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({
    description: 'Product status',
    enum: ProductStatus,
    example: ProductStatus.PUBLISHED,
  })
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @ApiPropertyOptional({
    description: 'Array of image public IDs to delete',
    example: ['image1', 'image2'],
    isArray: true,
  })
  @IsOptional()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (value && typeof value === 'string') return JSON.parse(value);
    return value;
  })
  imagesToDelete?: string[];
}
