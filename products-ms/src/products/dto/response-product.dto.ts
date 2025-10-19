export class ResponseProductDto {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  stock: number;
  status: string;
  type: string;
  gender: string;
  sizes: string[];
  tags: string[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
