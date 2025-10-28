import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PRODUCT_SERVICE } from '../config';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import {
  ApiConsumes,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @ApiOperation({
    summary: 'Seed initial products',
    description:
      'Populates the database with initial product data for development and testing purposes.',
  })
  @ApiResponse({
    status: 201,
    description: 'Products seeded successfully.',
    schema: {
      example: {
        message: 'Seeding completed successfully',
      },
    },
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Post('seed')
  seed() {
    return this.productsClient.send({ cmd: 'seed' }, {}).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error('Error fetching products'));
      }),
    );
  }

  @ApiExtraModels(CreateProductDto)
  @ApiOperation({
    summary: 'Create a new product',
    description:
      'Creates a new product in the system with the provided information including name, description, price, inventory details, and optional product images.',
  })
  @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   description: 'Product data and images',
  //   schema: {
  //     allOf: [
  //       { $ref: getSchemaPath(CreateProductDto) },
  //       {
  //         type: 'object',
  //         properties: {
  //           productImages: {
  //             type: 'array',
  //             items: {
  //               type: 'string',
  //               format: 'binary',
  //             },
  //             description: 'Product images (max 5)',
  //           },
  //         },
  //       },
  //     ],
  //   },
  // })
  // @ApiResponse({
  //   status: 201,
  //   description: 'Product created successfully.',
  //   type: ResponseProductDto,
  // })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @UseInterceptors(FilesInterceptor('productImages'))
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.productsClient
      .send({ cmd: 'create' }, { createProductDto, files })
      .pipe(
        catchError((err) => {
          console.error(err);
          return throwError(() => new Error('Error fetching products'));
        }),
      );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all products with filters',
    description:
      'Retrieves a paginated list of products. Supports filtering by search term, type, gender, size, price range, and sorting options.',
  })
  @ApiResponse({
    status: 200,
    description: 'Products retrieved successfully.',
    schema: {
      example: {
        message: 'Products retrieved successfully',
        data: {
          data: [
            {
              id: '123e4567-e89b-12d3-a456-426614174000',
              name: 'Producto ejemplo',
              slug: 'producto-ejemplo',
              description: 'Descripción del producto',
              price: 29.99,
              stock: 100,
              type: 'shirt',
              gender: 'unisex',
              size: ['S', 'M', 'L'],
              images: ['url1', 'url2'],
            },
          ],
          meta: {
            total: 100,
            page: 1,
            limit: 10,
            lastPage: 10,
          },
        },
      },
    },
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  findAll() {
    return this.productsClient.send({ cmd: 'findAll' }, { limit: -1 }).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error('Error fetching products'));
      }),
    );
  }

  // @Get('suggestions')
  // @ApiOperation({
  //   summary: 'Get search suggestions',
  //   description:
  //     'Returns product suggestions based on a search query. Useful for autocomplete functionality. Minimum 2 characters required.',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Suggestions retrieved successfully.',
  //   schema: {
  //     example: {
  //       message: 'Suggestions retrieved successfully',
  //       data: [
  //         {
  //           id: '123e4567-e89b-12d3-a456-426614174000',
  //           name: 'Camisa Polo Azul',
  //           slug: 'camisa-polo-azul',
  //           price: 29.99,
  //           image: 'https://example.com/image.jpg',
  //         },
  //       ],
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Query too short (minimum 2 characters).',
  // })
  // @ApiResponse({ status: 500, description: 'Internal server error.' })
  // getSearchSuggestions(@Query() searchSuggestionsDto: SearchSuggestionsDto) {
  //   return this.productsClient
  //     .send({ cmd: 'suggestions' }, { searchSuggestionsDto })
  //     .pipe(
  //       catchError((err) => {
  //         console.error(err);
  //         return throwError(() => new Error('Error fetching products'));
  //       }),
  //     );
  // }

  @Get(':term')
  @ApiOperation({
    summary: 'Get product by ID or slug',
    description: 'Retrieves a single product by its UUID or slug identifier.',
  })
  @ApiParam({
    name: 'term',
    description: 'Product UUID or slug',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Product retrieved successfully.',
  //   type: ResponseProductDto,
  // })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  findOne(@Param('term') term: string) {
    return this.productsClient.send({ cmd: 'findOne' }, { term }).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error('Error fetching products'));
      }),
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a product',
    description:
      'Updates an existing product. Allows updating product information, adding new images, and deleting existing images.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'id',
    description: 'Product UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  // @ApiBody({
  //   description: 'Updated product data',
  //   type: UpdateProductDto,
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Product updated successfully.',
  //   type: ResponseProductDto,
  // })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @UseInterceptors(FilesInterceptor('productImages'))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.productsClient
      .send({ cmd: 'update' }, { id, updateProductDto, files })
      .pipe(
        catchError((err) => {
          console.error(err);
          return throwError(() => new Error('Error fetching products'));
        }),
      );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a product',
    description: 'Soft deletes a product by changing its status to INACTIVE.',
  })
  @ApiParam({
    name: 'id',
    description: 'Product UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully.',
    schema: {
      example: {
        message: 'Product Camisa Polo deleted successfully.',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  remove(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'remove' }, { id }).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error('Error fetching products'));
      }),
    );
  }
}
