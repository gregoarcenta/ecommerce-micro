import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'Product title', example: 'T-shirt teslo' })
  @Length(3, 100)
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  title: string;

  @ApiPropertyOptional({
    description: 'Product description',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  })
  @IsOptional()
  @Length(3, 255)
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  description?: string;

  @ApiPropertyOptional({ description: 'Product price', example: '10.99' })
  @IsOptional()
  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  @Matches(/^\d+\.\d{2}$/, { message: 'Price must have exactly 2 decimals' })
  price?: string;

  @ApiPropertyOptional({ description: 'Product stock', example: 10 })
  @IsOptional()
  @Min(0)
  @IsInt()
  @IsNumber()
  @Type(() => Number)
  stock?: number;

  @ApiProperty({
    description: 'Product type',
    example: ProductType.SHIRTS,
    enum: ProductType,
  })
  @IsEnum(ProductType)
  type: ProductType;

  @ApiProperty({
    description: 'Product gender',
    example: Gender.MEN,
    enum: Gender,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: 'Product sizes',
    example: [Size.XS, Size.S],
    enum: Size,
  })
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  @IsEnum(Size, { each: true })
  sizes: Size[];

  @ApiPropertyOptional({ example: ['shirt'], description: 'Product tags' })
  @IsOptional()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ example: ['img1.jpg'], description: 'Product images' })
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  images?: string[];
}
