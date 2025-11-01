import { IsEmail, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;
}
