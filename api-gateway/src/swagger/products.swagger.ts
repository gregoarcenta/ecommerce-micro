import { SwaggerConfig } from '../common';

export const ProductsSwaggerConfig: SwaggerConfig = {
  seed: {
    operation: {
      summary: 'Sembrar productos iniciales',
      description:
        'Inicializa la base de datos con datos de productos de ejemplo para pruebas y desarrollo.',
    },
    responses: [
      {
        status: 201,
        description: 'Productos sembrados correctamente.',
        schema: {
          example: {
            statusCode: 201,
            message: 'Seeding completado correctamente',
            data: null,
            timestamp: '2025-10-30T03:10:11.102Z',
            path: '/api/products/seed',
          },
        },
      },
      {
        status: 500,
        description: 'Error interno del servidor.',
        schema: {
          example: {
            statusCode: 500,
            error: 'InternalServerError',
            message: 'Ocurrió un error inesperado al sembrar los datos',
            path: '/api/products/seed',
            timestamp: '2025-10-30T03:10:11.102Z',
          },
        },
      },
    ],
  },

  create: {
    operation: {
      summary: 'Crear un nuevo producto',
      description:
        'Crea un nuevo producto con soporte de subida de imágenes (máximo 5).',
    },
    consumes: 'multipart/form-data',
    body: {
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Camiseta Tesla Logo' },
          description: {
            type: 'string',
            example: 'Camiseta de alta calidad con logo bordado.',
          },
          price: {
            type: 'string',
            example: '29.99',
            pattern: '^\\d+\\.\\d{2}$',
            description: 'Precio con exactamente 2 decimales (formato string).',
          },
          stock: { type: 'number', example: 100, minimum: 0 },
          type: {
            type: 'string',
            enum: [
              'SHIRTS',
              'PANTS',
              'SHOES',
              'HOODIES',
              'HATS',
              'ACCESSORIES',
            ],
            example: 'SHIRTS',
          },
          gender: {
            type: 'string',
            enum: ['MEN', 'WOMEN', 'UNISEX'],
            example: 'UNISEX',
          },
          sizes: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            },
            example: ['S'],
            description: 'Listado de tallas disponibles (únicas y no vacías).',
          },
          tags: {
            type: 'array',
            items: { type: 'string' },
            example: ['shirt'],
            description: 'Etiquetas opcionales del producto.',
          },
          productImages: {
            type: 'array',
            items: { type: 'string', format: 'binary' },
            description: 'Imágenes del producto (máximo 5).',
          },
        },
        required: ['name', 'type', 'gender', 'sizes'],
      },
    },
    responses: [
      {
        status: 201,
        description: 'Producto creado correctamente.',
        schema: {
          example: {
            statusCode: 201,
            message: 'Producto creado correctamente',
            data: {
              id: 'c11b4457-4f24-4015-93ff-05a29108f3a1',
              name: 'Camiseta Tesla Logo',
              slug: 'camiseta-tesla-logo',
              description: 'Camiseta de alta calidad con logo bordado.',
              price: '29.99',
              stock: 100,
              status: 'DRAFT',
              type: 'SHIRTS',
              gender: 'UNISEX',
              sizes: ['S', 'M', 'L'],
              tags: ['shirt', 'new'],
              createdAt: '2025-10-30T03:12:25.292Z',
              updatedAt: '2025-10-30T03:12:25.292Z',
              images: [
                'https://res.cloudinary.com/dksluyb9v/image/upload/v1761793941/ecommerce/products/bvk41pgkxt7ug59ynrtd.png',
              ],
            },
            timestamp: '2025-10-30T03:12:27.109Z',
            path: '/api/products',
          },
        },
      },
      {
        status: 400,
        description: 'Solicitud inválida: formato o datos no válidos.',
        schema: {
          example: {
            statusCode: 400,
            error: 'BadRequestException',
            message: 'El campo price debe tener exactamente 2 decimales',
            path: '/api/products',
            timestamp: '2025-10-30T03:12:27.109Z',
            details: { price: 'Formato inválido' },
          },
        },
      },
      {
        status: 413,
        description: 'Archivo demasiado grande o demasiados archivos (máx. 5).',
      },
      {
        status: 415,
        description: 'Tipo de contenido no soportado. Use multipart/form-data.',
      },
      {
        status: 422,
        description: 'Error de validación de datos.',
      },
      { status: 500, description: 'Error interno del servidor.' },
    ],
  },

  findAll: {
    operation: {
      summary: 'Listar productos',
      description:
        'Obtiene un listado paginado de productos con soporte de filtros y ordenamiento.',
    },
    queries: [
      {
        name: 'page',
        required: false,
        description: 'Número de página (>= 1).',
        example: 1,
        type: Number,
      },
      {
        name: 'limit',
        required: false,
        description: 'Cantidad de elementos por página (>= 1).',
        example: 6,
        type: Number,
      },
      {
        name: 'status',
        required: false,
        description: 'Filtrar por estado del producto.',
        enum: ['PUBLISHED', 'DRAFT'],
        example: 'PUBLISHED',
      },
      {
        name: 'search',
        required: false,
        description: 'Búsqueda por nombre del producto.',
        example: 'hoodie',
      },
      {
        name: 'type',
        required: false,
        description: 'Filtrar por tipo de producto. Permite múltiples valores.',
        enum: ['SHIRTS', 'PANTS', 'SHOES', 'HOODIES', 'HATS', 'ACCESSORIES'],
        isArray: true,
        example: ['HOODIES', 'HATS'],
      },
      {
        name: 'gender',
        required: false,
        description: 'Filtrar por género. Permite múltiples valores.',
        enum: ['MEN', 'WOMEN', 'UNISEX'],
        isArray: true,
        example: ['UNISEX'],
      },
      {
        name: 'size',
        required: false,
        description: 'Filtrar por talla. Permite múltiples valores.',
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        isArray: true,
        example: ['M', 'L'],
      },
      {
        name: 'minPrice',
        required: false,
        description: 'Precio mínimo.',
        example: 10.0,
        type: Number,
      },
      {
        name: 'maxPrice',
        required: false,
        description: 'Precio máximo.',
        example: 100.0,
        type: Number,
      },
      {
        name: 'orderBy',
        required: false,
        description: 'Orden de resultados.',
        enum: ['PRICE_ASC', 'PRICE_DESC', 'NEWEST'],
        example: 'NEWEST',
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Listado obtenido correctamente.',
        schema: {
          example: {
            statusCode: 200,
            message: 'Success',
            data: {
              data: [
                {
                  id: '15246b84-42c5-4491-a73f-910ee229d26d',
                  name: 'Cybertruck Graffiti Hoodie',
                  slug: 'cybertruck-graffiti-hoodie',
                  description:
                    'As with the iconic Tesla logo, the Cybertruck Graffiti Hoodie is a classic in the making. Unisex style featuring soft fleece and an adjustable, jersey-lined hood for comfortable coverage.',
                  price: '60.00',
                  stock: 13,
                  status: 'PUBLISHED',
                  type: 'HOODIES',
                  gender: 'UNISEX',
                  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                  tags: ['hoodie'],
                  createdAt: '2025-10-30T03:09:47.570Z',
                  updatedAt: '2025-10-30T03:09:47.570Z',
                  images: [
                    'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/ormhegiv58arvfdivuc4.jpg',
                    'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/uvkwrwbmppitarmcw3rh.jpg',
                  ],
                },
              ],
              meta: {
                total: 9,
                page: 1,
                limit: 1,
                lastPage: 9,
              },
            },
            timestamp: '2025-10-30T03:17:47.723Z',
            path: '/api/products?limit=1&type=HATS&type=HOODIES',
          },
        },
      },
      {
        status: 400,
        description: 'Solicitud inválida: parámetros de filtro no válidos.',
        schema: {
          example: {
            statusCode: 400,
            error: 'BadRequestException',
            message: 'El parámetro minPrice debe ser un número válido',
            path: '/api/products',
            timestamp: '2025-10-30T03:17:47.723Z',
          },
        },
      },
      { status: 500, description: 'Error interno del servidor.' },
    ],
  },

  suggestions: {
    operation: {
      summary: 'Obtener sugerencias de búsqueda',
      description:
        'Devuelve sugerencias de productos para autocompletado en función del término de búsqueda.',
    },
    queries: [
      {
        name: 'query',
        required: true,
        description: 'Término de búsqueda (mínimo 2 caracteres).',
        example: 'shirt',
      },
      {
        name: 'limit',
        required: false,
        description: 'Cantidad de resultados a devolver (>= 1).',
        example: 5,
        type: Number,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Sugerencias obtenidas correctamente.',
        schema: {
          example: {
            statusCode: 200,
            message: 'Success',
            data: [
              {
                id: '2f1732af-563d-4899-ad1b-64f4a8da39a6',
                name: "Women's Raven Joggers",
                slug: 'women-s-raven-joggers',
                price: '100.00',
                image:
                  'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/gi1nsepqp9pz6qy2jk4r.jpg',
              },
              {
                id: '2827ff5f-900b-4316-bd93-6287699c56f4',
                name: "Women's Raven Slouchy Crew Sweatshirt",
                slug: 'women-s-raven-slouchy-crew-sweatshirt',
                price: '110.00',
                image:
                  'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/gyltscxkpnfufgowvitp.jpg',
              },
              {
                id: '54e0cf37-f8e8-4d08-a7d8-ed7cc620bba2',
                name: "Men's Quilted Shirt Jacket",
                slug: 'men-s-quilted-shirt-jacket',
                price: '200.00',
                image:
                  'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/ii0ye9u0elcuohv6lhuq.jpg',
              },
              {
                id: '35950bf6-ac5a-48a2-ab84-d86623345121',
                name: "Men's Chill Crew Neck Sweatshirt",
                slug: 'men-s-chill-crew-neck-sweatshirt',
                price: '75.00',
                image:
                  'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/ql5rsw3bnebyjp8sun3r.webp',
              },
            ],
            timestamp: '2025-10-30T03:19:29.124Z',
            path: '/api/products/suggestions?query=shirt',
          },
        },
      },
      {
        status: 400,
        description: 'Consulta demasiado corta (mínimo 2 caracteres).',
        schema: {
          example: {
            statusCode: 400,
            error: 'BadRequestException',
            message: 'El parámetro query debe tener al menos 2 caracteres',
            path: '/api/products/suggestions',
            timestamp: '2025-10-30T03:19:29.124Z',
          },
        },
      },
      { status: 500, description: 'Error interno del servidor.' },
    ],
  },

  findOne: {
    operation: {
      summary: 'Obtener producto por ID o slug',
      description: 'Recupera un producto específico por su UUID o slug.',
    },
    params: [
      {
        name: 'term',
        description: 'UUID del producto o slug',
        example: 'women-s-raven-joggers',
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Producto obtenido correctamente.',
        schema: {
          example: {
            statusCode: 200,
            message: 'Success',
            data: {
              id: '2f1732af-563d-4899-ad1b-64f4a8da39a6',
              name: "Women's Raven Joggers",
              slug: 'women-s-raven-joggers',
              description:
                "Introducing the Tesla Raven Collection. The Women's Raven Joggers have a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The joggers feature a subtle thermoplastic polyurethane Tesla wordmark and T logo and a french terry interior for a cozy look and feel in every season. Pair them with your Raven Slouchy Crew Sweatshirt, Raven Lightweight Zip Up Jacket or other favorite on the go fit. Made from 70% bamboo and 30% cotton.",
              price: '100.00',
              stock: 162,
              status: 'PUBLISHED',
              type: 'SHIRTS',
              gender: 'WOMEN',
              sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
              tags: ['shirt'],
              createdAt: '2025-10-30T03:10:00.210Z',
              updatedAt: '2025-10-30T03:10:00.210Z',
              images: [
                'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/z4u3pinzgbmmqrmjwtil.jpg',
                'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/gi1nsepqp9pz6qy2jk4r.jpg',
              ],
            },
            timestamp: '2025-10-30T03:20:50.833Z',
            path: '/api/products/2f1732af-563d-4899-ad1b-64f4a8da39a6',
          },
        },
      },
      {
        status: 404,
        description: 'Producto no encontrado.',
        schema: {
          example: {
            statusCode: 404,
            error: 'NotFoundException',
            message: 'Product not found',
            path: '/api/products/2f1732af-563d-4899-ad1b-64f4a8da39a1',
            timestamp: '2025-10-30T03:21:18.458Z',
          },
        },
      },
      {
        status: 400,
        description: 'Solicitud inválida: parámetro term no válido.',
        schema: {
          example: {
            statusCode: 400,
            error: 'BadRequestException',
            message: 'El parámetro term debe ser un UUID válido o un slug',
            path: '/api/products/invalid',
            timestamp: '2025-10-30T03:21:18.458Z',
          },
        },
      },
      { status: 500, description: 'Error interno del servidor.' },
    ],
  },

  update: {
    operation: {
      summary: 'Actualizar un producto',
      description:
        'Actualiza la información de un producto y permite gestionar imágenes nuevas y eliminación de existentes.',
    },
    consumes: 'multipart/form-data',
    params: [
      {
        name: 'id',
        description: 'UUID del producto',
        example: '123e4567-e89b-12d3-a456-426614174000',
      },
    ],
    body: {
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Camiseta Tesla Logo' },
          description: {
            type: 'string',
            example: 'Camiseta de alta calidad con logo bordado.',
          },
          price: {
            type: 'string',
            example: '39.99',
            pattern: '^\\d+\\.\\d{2}$',
            description: 'Precio con exactamente 2 decimales (formato string).',
          },
          stock: { type: 'number', example: 50, minimum: 0 },
          type: {
            type: 'string',
            enum: [
              'SHIRTS',
              'PANTS',
              'SHOES',
              'HOODIES',
              'HATS',
              'ACCESSORIES',
            ],
            example: 'SHIRTS',
          },
          gender: {
            type: 'string',
            enum: ['MEN', 'WOMEN', 'UNISEX'],
            example: 'UNISEX',
          },
          sizes: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            },
            example: ['M'],
            description: 'Listado de tallas disponibles.',
          },
          tags: {
            type: 'array',
            items: { type: 'string' },
            example: ['popular'],
          },
          productImages: {
            type: 'array',
            items: { type: 'string', format: 'binary' },
            description: 'Imágenes nuevas del producto (máximo 5).',
          },
          imagesToDelete: {
            type: 'array',
            items: { type: 'string' },
            description:
              'IDs públicos de imágenes a eliminar (Cloudinary public_id).',
            example: ['products/abc123', 'products/xyz789'],
          },
        },
      },
    },
    responses: [
      {
        status: 200,
        description: 'Producto actualizado correctamente.',
        schema: {
          example: {
            statusCode: 200,
            message: 'Product updated successfully',
            data: {
              id: '2f1732af-563d-4899-ad1b-64f4a8da39a6',
              name: "Women's Raven Joggers",
              slug: 'women-s-raven-joggers',
              description:
                "Introducing the Tesla Raven Collection. The Women's Raven Joggers have a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The joggers feature a subtle thermoplastic polyurethane Tesla wordmark and T logo and a french terry interior for a cozy look and feel in every season. Pair them with your Raven Slouchy Crew Sweatshirt, Raven Lightweight Zip Up Jacket or other favorite on the go fit. Made from 70% bamboo and 30% cotton.",
              price: '100.00',
              stock: 162,
              status: 'DRAFT',
              type: 'SHIRTS',
              gender: 'WOMEN',
              sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
              tags: ['shirt'],
              createdAt: '2025-10-30T03:10:00.210Z',
              updatedAt: '2025-10-30T03:24:24.809Z',
              images: [
                'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/z4u3pinzgbmmqrmjwtil.jpg',
                'https://res.cloudinary.com/dksluyb9v/image/upload/v1760821924/ecommerce/products/gi1nsepqp9pz6qy2jk4r.jpg',
              ],
            },
            timestamp: '2025-10-30T03:24:25.460Z',
            path: '/api/products/2f1732af-563d-4899-ad1b-64f4a8da39a6',
          },
        },
      },
      {
        status: 404,
        description: 'Producto no encontrado.',
        schema: {
          example: {
            statusCode: 404,
            error: 'NotFoundException',
            message: 'Product not found',
            path: '/api/products/2f1732af-563d-4899-ad1b-64f4a8da39a6',
            timestamp: '2025-10-30T03:24:25.460Z',
          },
        },
      },
      {
        status: 400,
        description: 'Solicitud inválida: datos o formato no válidos.',
      },
      {
        status: 413,
        description: 'Archivo demasiado grande o demasiados archivos (máx. 5).',
      },
      {
        status: 415,
        description: 'Tipo de contenido no soportado. Use multipart/form-data.',
      },
      {
        status: 422,
        description: 'Error de validación de datos.',
      },
      { status: 500, description: 'Error interno del servidor.' },
    ],
  },

  remove: {
    operation: {
      summary: 'Eliminar un producto',
      description:
        'Realiza un borrado lógico (soft delete) del producto indicado.',
    },
    params: [
      {
        name: 'id',
        description: 'UUID del producto',
        example: '123e4567-e89b-12d3-a456-426614174000',
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Producto eliminado correctamente.',
        schema: {
          example: {
            statusCode: 200,
            message: "Product Women's Raven Joggers deleted successfully.",
            data: null,
            timestamp: '2025-10-30T03:25:35.535Z',
            path: '/api/products/2f1732af-563d-4899-ad1b-64f4a8da39a6',
          },
        },
      },
      {
        status: 404,
        description: 'Producto no encontrado.',
        schema: {
          example: {
            statusCode: 404,
            error: 'NotFoundException',
            message: 'Product not found',
            path: '/api/products/2f1732af-563d-4899-ad1b-64f4a8da39a6',
            timestamp: '2025-10-30T03:25:35.535Z',
          },
        },
      },
      {
        status: 400,
        description: 'Solicitud inválida: id no es un UUID válido.',
        schema: {
          example: {
            statusCode: 400,
            error: 'BadRequestException',
            message: 'El parámetro id debe ser un UUID válido',
            path: '/api/products/not-uuid',
            timestamp: '2025-10-30T03:25:35.535Z',
          },
        },
      },
      { status: 500, description: 'Error interno del servidor.' },
    ],
  },
};
