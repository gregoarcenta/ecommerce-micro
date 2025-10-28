import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envConfig, PRODUCT_SERVICE } from '../config';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envConfig.PRODUCTS_HOST,
          port: envConfig.PRODUCTS_PORT,
        },
      },
    ]),
  ],
})
export class ProductsModule {}
