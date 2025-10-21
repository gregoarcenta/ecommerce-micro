import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

export class PaginateProductDto {
  @ApiPropertyOptional({ description: 'Page number', example: 1 })
  @IsPositive()
  page: number = 1;

  @ApiPropertyOptional({ description: 'Number of items per page', example: 6 })
  @IsPositive()
  limit: number = 6;
}
