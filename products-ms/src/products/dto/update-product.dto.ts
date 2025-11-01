import { CreateProductDto } from './create-product.dto';
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
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  imagesToDelete?: string[];
}
