import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors, } from '@nestjs/common';
import ProductsService from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Result } from '../common/result/result';
import { Product } from 'generated/prisma';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    summary: 'Create a new product',
    description:
      'Creates a new product in the system with the provided information including name, description, price, and inventory details.',
  })
  @Post()
  @UseInterceptors(FilesInterceptor('productImages'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const result: Result<Product> = await this.productsService.create(
      createProductDto,
      files,
    );

    if (result.isErr()) throw result.error();

    return {
      data: result.unwrap(),
      message: 'Product created successfully',
    };
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
