import { Module } from '@nestjs/common';
import ProductsService from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../common/services/prisma.service';
import { CloudinaryService } from '../common/services/cloudinary.service';
import { CloudinaryProvider } from '../config/cloudinary.config';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    PrismaService,
    CloudinaryService,
    CloudinaryProvider.config(),
  ],
})
export class ProductsModule {}
