import {
  Controller,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import ProductsService from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { FiltersProductDto } from './dto/filters-product.dto';
import { SearchSuggestionsDto } from './dto/search-suggestions.dto';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

interface ProductDto {
  product: CreateProductDto;
  files: Array<Express.Multer.File>;
}

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'seed' })
  async seed() {
    await this.productsService.seed();

    return 'Seeding completed successfully';
  }

  async create(@Payload() productDto: ProductDto) {
    const createdProduct = await this.productsService.create(
      productDto.product,
      productDto.files,
    );
    return {
      message: 'Product created successfully',
      data: createdProduct,
    };
  }

  @UsePipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new RpcException(errors),
    }),
  )
  @MessagePattern({ cmd: 'findAll' })
  findAll(@Payload() filtersProductDto: FiltersProductDto) {
    return this.productsService.findAll(filtersProductDto);
  }

  @MessagePattern({ cmd: 'suggestions' })
  getSearchSuggestions(@Payload() searchSuggestionsDto: SearchSuggestionsDto) {
    return this.productsService.getSearchSuggestions(searchSuggestionsDto);
  }

  @MessagePattern({ cmd: 'findOne' })
  findOne(@Payload('term') term: string) {
    return this.productsService.findOne(term);
  }

  @MessagePattern({ cmd: 'update' })
  async update(
    @Payload('id', ParseUUIDPipe) id: string,
    @Payload('updateProductDto') updateProductDto: UpdateProductDto,
    @Payload('files') files: Array<Express.Multer.File>,
  ) {
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

  @MessagePattern({ cmd: 'remove' })
  async remove(@Payload('id', ParseUUIDPipe) id: string) {
    const removedProduct = await this.productsService.remove(id);
    return `Product ${removedProduct.name} deleted successfully.`;
  }
}
