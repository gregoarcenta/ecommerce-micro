import { PaginateProductDto } from './paginate-product.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsEnum, IsNumber, IsOptional, Min, } from 'class-validator';
import { Gender, ProductStatus, Size, Type } from 'generated/prisma';
import { Transform } from 'class-transformer';

export enum ProductOrderBy {
  PRICE_ASC = 'PRICE_ASC',
  PRICE_DESC = 'PRICE_DESC',
  NEWEST = 'NEWEST',
}

export class FiltersProductDto extends PaginateProductDto {
  @ApiPropertyOptional({
    description: 'Filter by product status',
    example: ProductStatus.PUBLISHED,
    enum: ProductStatus,
    default: ProductStatus.PUBLISHED,
  })
  @IsOptional()
  @IsEnum(ProductStatus)
  status: ProductStatus = ProductStatus.PUBLISHED;

  @ApiPropertyOptional({
    description: 'Filter by product type',
    example: Type.SHIRTS,
    enum: Type,
    isArray: true,
  })
  @IsOptional()
  @IsEnum(Type, { each: true })
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  type?: Type[];

  @ApiPropertyOptional({
    description: 'Filter by gender',
    example: Gender.MEN,
    enum: Gender,
    isArray: true,
  })
  @IsOptional()
  @IsEnum(Gender, { each: true })
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  gender?: Gender[];

  @ApiPropertyOptional({
    description: 'Filter by size',
    example: 'XS',
    enum: Size,
    isArray: true,
  })
  @IsOptional()
  @IsEnum(Size, { each: true })
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  size?: Size[];

  @ApiPropertyOptional({
    description: 'Minimum price',
    example: 10.0,
  })
  @IsOptional()
  @Min(0)
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  minPrice?: number;

  @ApiPropertyOptional({
    description: 'Maximum price',
    example: 100.0,
  })
  @IsOptional()
  @Min(0)
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  maxPrice?: number;

  @ApiPropertyOptional({
    description: 'Order results',
    enum: ProductOrderBy,
    example: ProductOrderBy.PRICE_ASC,
  })
  @IsOptional()
  @IsEnum(ProductOrderBy)
  orderBy?: ProductOrderBy;
}
