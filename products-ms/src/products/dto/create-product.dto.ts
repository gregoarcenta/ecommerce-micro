import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsDecimal,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Gender, Size, Type as ProductType } from 'generated/prisma';

export class CreateProductDto {
  @Length(3, 100)
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  name: string;

  @IsOptional()
  @Length(3, 255)
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  description?: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  @Matches(/^\d+\.\d{2}$/, { message: 'Price must have exactly 2 decimals' })
  price?: string;

  @IsOptional()
  @Min(0)
  @IsInt()
  @IsNumber()
  @Type(() => Number)
  stock?: number;

  @IsEnum(ProductType)
  type: ProductType;

  @IsEnum(Gender)
  gender: Gender;

  @IsEnum(Size, { each: true })
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  sizes: Size[];

  @IsOptional()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  tags?: string[];
}
