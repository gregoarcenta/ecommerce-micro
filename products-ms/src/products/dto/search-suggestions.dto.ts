import { IsOptional, IsString, Min, MinLength } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class SearchSuggestionsDto {
  @IsString()
  @MinLength(2)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  query: string;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit?: number = 5;
}
