import { IsOptional, IsString, Min, MinLength } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SearchSuggestionsDto {
  @ApiProperty({ description: 'Search query', example: 'shirt' })
  @IsString()
  @MinLength(2)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  query: string;

  @ApiPropertyOptional({
    description: 'Number of results to return',
    example: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit?: number = 5;
}
