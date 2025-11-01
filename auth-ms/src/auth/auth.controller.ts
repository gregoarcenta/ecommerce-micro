import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth_register')
  async register(@Payload() registerDto: RegisterDto) {
    const data = await this.authService.register(registerDto);
    return {
      message: 'User created successfully',
      data,
    };
  }

  @MessagePattern('auth_login')
  async login(@Payload() loginDto: LoginDto) {
    const data = await this.authService.login(loginDto);
    return {
      message: 'User logged in successfully',
      data,
    };
  }

  @MessagePattern('validate_token')
  async validateToken(@Payload('token') token: string) {
    return await this.authService.validateToken(token);
  }
}
