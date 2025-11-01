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
  id: string;

  /**
   * Nombre del producto.
   * @example "Camiseta Nike Dri-FIT"
   */
  name: string;

  /**
   * Slug del producto (URL-friendly).
   * Se genera automáticamente a partir del nombre del producto.
   * @example "camiseta-nike-dri-fit"
   */
  slug: string;

  /**
   * Descripción detallada del producto.
   * Puede ser null si no se proporciona descripción.
   * @example "Camiseta deportiva con tecnología Dri-FIT para máxima transpirabilidad"
   */
  description: string | null;

  /**
   * Precio del producto en formato string con dos decimales.
   * @example "29.99"
   */
  price: string;

  /**
   * Cantidad disponible en stock.
   * @example 150
   */
  stock: number;

  /**
   * Estado del producto (DRAFT, PUBLISHED, ARCHIVED).
   * @example "PUBLISHED"
   */
  status: string;

  /**
   * Tipo de producto (SHIRT, PANTS, SHOES, etc.).
   * @example "SHIRT"
   */
  type: string;

  /**
   * Género al que está dirigido el producto (MEN, WOMEN, UNISEX, KIDS).
   * @example "MEN"
   */
  gender: string;

  /**
   * Tallas disponibles del producto.
   * @example ["S", "M", "L", "XL"]
   */
  sizes: string[];

  /**
   * Etiquetas asociadas al producto para búsqueda y categorización.
   * @example ["deportiva", "verano", "running"]
   */
  tags: string[];

  /**
   * URLs de las imágenes del producto almacenadas en Cloudinary.
   * @example ["https://res.cloudinary.com/demo/image/upload/v1234567890/product1.jpg"]
   */
  images: string[];

  /**
   * Fecha y hora de creación del producto.
   * @example "2024-01-15T10:30:00.000Z"
   */
  createdAt: Date;

  /**
   * Fecha y hora de la última actualización del producto.
   * @example "2024-01-20T15:45:00.000Z"
   */
  updatedAt: Date;
}
