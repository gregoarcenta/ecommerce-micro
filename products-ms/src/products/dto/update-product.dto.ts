import { CreateProductDto } from './create-product.dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { ProductStatus } from 'generated/prisma';
import { IsEnum } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({
    description: 'Product status',
    enum: ProductStatus,
    example: ProductStatus.PUBLISHED,
  })
  @IsEnum(ProductStatus)
  status?: ProductStatus;
}
