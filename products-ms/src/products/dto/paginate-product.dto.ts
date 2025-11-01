import { IsPositive } from 'class-validator';

export class PaginateProductDto {
  @IsPositive()
  page: number = 1;

  @IsPositive()
  limit: number = 6;
}
