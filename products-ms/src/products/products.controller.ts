import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import ProductsService from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseProductDto } from './dto/response-product.dto';
import { Payload } from 'src/common/types';
import { Paginated } from '../common/interfaces/paginate.interface';
import { FiltersProductDto } from './dto/filters-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('seed')
  @ApiOperation({ summary: 'Seed initial products' })
  async seedProducts(): Promise<Payload<string>> {
    await this.productsService.seed();

    return 'Seeding completed successfully';
  }

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
  ): Promise<Payload<ResponseProductDto>> {
    const createdProduct = await this.productsService.create(
      createProductDto,
      files,
    );
    return {
      message: 'Product created successfully',
      data: createdProduct,
    };
  }

  @Get()
  findAll(
    @Query() filtersProductDto: FiltersProductDto,
  ): Promise<Payload<Paginated<ResponseProductDto>>> {
    return this.productsService.findAll(filtersProductDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string): Promise<Payload<ResponseProductDto>> {
    return this.productsService.findOne(term);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('productImages'))
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Payload<ResponseProductDto>> {
    const { imagesToDelete, ...data } = updateProductDto;
    const updatedProduct = await this.productsService.update(
      id,
      data,
      files,
      imagesToDelete,
    );

    return {
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Payload<string>> {
    const removedProduct = await this.productsService.remove(id);
    return `Product ${removedProduct.name} deleted successfully.`;
  }
}
