import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO de respuesta para un producto.
 *
 * Representa la estructura de datos de un producto que se devuelve en las respuestas de la API.
 * Incluye toda la información del producto junto con las URLs de las imágenes procesadas.
 */
export class ResponseProductDto {
  /**
   * Identificador único del producto (UUID).
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  @ApiProperty({
    description: 'Identificador único del producto (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  /**
   * Nombre del producto.
   * @example "Camiseta Nike Dri-FIT"
   */
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Camiseta Nike Dri-FIT',
  })
  name: string;

  /**
   * Slug del producto (URL-friendly).
   * Se genera automáticamente a partir del nombre del producto.
   * @example "camiseta-nike-dri-fit"
   */
  @ApiProperty({
    description: 'Slug del producto para URLs amigables',
    example: 'camiseta-nike-dri-fit',
  })
  slug: string;

  /**
   * Descripción detallada del producto.
   * Puede ser null si no se proporciona descripción.
   * @example "Camiseta deportiva con tecnología Dri-FIT para máxima transpirabilidad"
   */
  @ApiProperty({
    description: 'Descripción detallada del producto',
    example:
      'Camiseta deportiva con tecnología Dri-FIT para máxima transpirabilidad',
    nullable: true,
  })
  description: string | null;

  /**
   * Precio del producto en formato string con dos decimales.
   * @example "29.99"
   */
  @ApiProperty({
    description: 'Precio del producto (formato string con 2 decimales)',
    example: '29.99',
  })
  price: string;

  /**
   * Cantidad disponible en stock.
   * @example 150
   */
  @ApiProperty({
    description: 'Cantidad disponible en inventario',
    example: 150,
  })
  stock: number;

  /**
   * Estado del producto (DRAFT, PUBLISHED, ARCHIVED).
   * @example "PUBLISHED"
   */
  @ApiProperty({
    description: 'Estado actual del producto',
    example: 'PUBLISHED',
    enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
  })
  status: string;

  /**
   * Tipo de producto (SHIRT, PANTS, SHOES, etc.).
   * @example "SHIRT"
   */
  @ApiProperty({
    description: 'Tipo o categoría del producto',
    example: 'SHIRT',
  })
  type: string;

  /**
   * Género al que está dirigido el producto (MEN, WOMEN, UNISEX, KIDS).
   * @example "MEN"
   */
  @ApiProperty({
    description: 'Género al que está dirigido el producto',
    example: 'MEN',
    enum: ['MEN', 'WOMEN', 'UNISEX', 'KIDS'],
  })
  gender: string;

  /**
   * Tallas disponibles del producto.
   * @example ["S", "M", "L", "XL"]
   */
  @ApiProperty({
    description: 'Lista de tallas disponibles',
    example: ['S', 'M', 'L', 'XL'],
    type: [String],
  })
  sizes: string[];

  /**
   * Etiquetas asociadas al producto para búsqueda y categorización.
   * @example ["deportiva", "verano", "running"]
   */
  @ApiProperty({
    description: 'Etiquetas del producto para búsqueda y categorización',
    example: ['deportiva', 'verano', 'running'],
    type: [String],
  })
  tags: string[];

  /**
   * URLs de las imágenes del producto almacenadas en Cloudinary.
   * @example ["https://res.cloudinary.com/demo/image/upload/v1234567890/product1.jpg"]
   */
  @ApiProperty({
    description: 'URLs de las imágenes del producto',
    example: [
      'https://res.cloudinary.com/demo/image/upload/v1234567890/product1.jpg',
    ],
    type: [String],
  })
  images: string[];

  /**
   * Fecha y hora de creación del producto.
   * @example "2024-01-15T10:30:00.000Z"
   */
  @ApiProperty({
    description: 'Fecha de creación del producto',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  /**
   * Fecha y hora de la última actualización del producto.
   * @example "2024-01-20T15:45:00.000Z"
   */
  @ApiProperty({
    description: 'Fecha de la última actualización del producto',
    example: '2024-01-20T15:45:00.000Z',
  })
  updatedAt: Date;
}
