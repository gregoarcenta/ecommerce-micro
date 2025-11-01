import {
  IsEmail,
  IsLowercase,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  name: string;

  @IsString()
  @IsEmail()
  @IsLowercase()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  password: string;
}
