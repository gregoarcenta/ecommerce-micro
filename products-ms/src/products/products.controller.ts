import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { PaginateProductDto } from './dto/paginate-product.dto';
import { Payload } from 'src/common/types';
import { Paginated } from '../common/interfaces/paginate.interface';

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
    const productCreated = await this.productsService.create(
      createProductDto,
      files,
    );
    return {
      message: 'Product created successfully',
      data: productCreated,
    };
  }

  @Get()
  findAll(
    @Query() paginateProductDto: PaginateProductDto,
  ): Promise<Payload<Paginated<ResponseProductDto>>> {
    return this.productsService.findAll(paginateProductDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Payload<ResponseProductDto>> {
    return this.productsService.findOneByIdOrSlug(id);
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
