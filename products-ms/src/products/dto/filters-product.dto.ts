import { PaginateProductDto } from './paginate-product.dto';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsEnum, IsNumber, IsOptional, IsString, Min, } from 'class-validator';
import { Gender, ProductStatus, Size, Type } from 'generated/prisma';
import { Transform } from 'class-transformer';

export enum ProductOrderBy {
  PRICE_ASC = 'PRICE_ASC',
  PRICE_DESC = 'PRICE_DESC',
  NEWEST = 'NEWEST',
}

export class FiltersProductDto extends PaginateProductDto {
  @IsOptional()
  @IsEnum(ProductStatus)
  status: ProductStatus = ProductStatus.PUBLISHED;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  search?: string;

  @IsOptional()
  @IsEnum(Type, { each: true })
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  type?: Type[];

  @IsOptional()
  @IsEnum(Gender, { each: true })
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  gender?: Gender[];

  @IsOptional()
  @IsEnum(Size, { each: true })
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  size?: Size[];

  @IsOptional()
  @Min(0)
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  minPrice?: number;

  @IsOptional()
  @Min(0)
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  maxPrice?: number;

  @IsOptional()
  @IsEnum(ProductOrderBy)
  orderBy?: ProductOrderBy;
}
