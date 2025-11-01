import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PRODUCT_SERVICE } from '../config';
import { ClientProxy } from '@nestjs/microservices';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductsSwaggerConfig } from '../swagger/products.swagger';
import { ApiDocs } from '../common';
import { Auth } from '../auth/decoratos/auth.decorator';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post('seed')
  @ApiDocs(ProductsSwaggerConfig.seed)
  seed() {
    return this.productsClient.send({ cmd: 'seed' }, {});
  }

  @Post()
  @ApiDocs(ProductsSwaggerConfig.create)
  @UseInterceptors(FilesInterceptor('productImages', 5))
  create(
    @Body() createProductDto: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const serializedFiles =
      files?.map((file) => ({
        buffer: file.buffer.toString('base64'),
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      })) || [];
    return this.productsClient.send(
      { cmd: 'create' },
      { createProductDto, files: serializedFiles },
    );
  }

  @Get()
  @ApiDocs(ProductsSwaggerConfig.findAll)
  findAll(@Query() filtersProductDto: any) {
    return this.productsClient.send({ cmd: 'findAll' }, filtersProductDto);
  }

  @Get('suggestions')
  @Auth()
  @ApiDocs(ProductsSwaggerConfig.suggestions)
  getSearchSuggestions(@Query() searchSuggestionsDto: any) {
    return this.productsClient.send(
      { cmd: 'suggestions' },
      searchSuggestionsDto,
    );
  }

  @Get(':term')
  @ApiDocs(ProductsSwaggerConfig.findOne)
  findOne(@Param('term') term: string) {
    return this.productsClient.send({ cmd: 'findOne' }, term);
  }

  @Patch(':id')
  @ApiDocs(ProductsSwaggerConfig.update)
  @UseInterceptors(FilesInterceptor('productImages', 5))
  update(
    @Param('id') id: string,
    @Body() updateProductDto: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const serializedFiles =
      files?.map((file) => ({
        buffer: file.buffer.toString('base64'),
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      })) || [];

    return this.productsClient.send(
      { cmd: 'update' },
      { id, updateProductDto, files: serializedFiles },
    );
  }

  @Delete(':id')
  @ApiDocs(ProductsSwaggerConfig.remove)
  remove(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'remove' }, { id });
  }
}
