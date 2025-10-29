import { Controller, ParseUUIDPipe } from '@nestjs/common';
import ProductsService from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { FiltersProductDto } from './dto/filters-product.dto';
import { SearchSuggestionsDto } from './dto/search-suggestions.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'seed' })
  async seed() {
    await this.productsService.seed();

    return 'Seeding completed successfully';
  }

  @MessagePattern({ cmd: 'create' })
  async create(
    @Payload('createProductDto') createProductDto: CreateProductDto,
    @Payload('files') files: Array<Express.Multer.File>,
  ) {
    const newFiles: Express.Multer.File[] =
      files?.map(
        (fileData) =>
          ({
            buffer: Buffer.from(fileData.buffer as unknown as string, 'base64'),
            originalname: fileData.originalname,
            mimetype: fileData.mimetype,
            size: fileData.size,
          }) as Express.Multer.File,
      ) || [];

    const data = await this.productsService.create(createProductDto, newFiles);

    return {
      message: 'Product created successfully',
      data,
    };
  }

  @MessagePattern({ cmd: 'findAll' })
  findAll(@Payload() filtersProductDto: FiltersProductDto) {
    return this.productsService.findAll(filtersProductDto);
  }

  @MessagePattern({ cmd: 'suggestions' })
  getSearchSuggestions(@Payload() searchSuggestionsDto: SearchSuggestionsDto) {
    return this.productsService.getSearchSuggestions(searchSuggestionsDto);
  }

  @MessagePattern({ cmd: 'findOne' })
  findOne(@Payload() term: string) {
    return this.productsService.findOne(term);
  }

  @MessagePattern({ cmd: 'update' })
  async update(
    @Payload('id', ParseUUIDPipe) id: string,
    @Payload('updateProductDto') updateProductDto: UpdateProductDto,
    @Payload('files') files: Array<Express.Multer.File>,
  ) {
    const { imagesToDelete, ...data } = updateProductDto;

    const newFiles: Express.Multer.File[] =
      files?.map(
        (fileData) =>
          ({
            buffer: Buffer.from(fileData.buffer as unknown as string, 'base64'),
            originalname: fileData.originalname,
            mimetype: fileData.mimetype,
            size: fileData.size,
          }) as Express.Multer.File,
      ) || [];

    const updatedProduct = await this.productsService.update(
      id,
      data,
      newFiles,
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
