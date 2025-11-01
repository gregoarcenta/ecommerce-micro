import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth_register')
  async register(data: { email: string; password: string; name: string }) {
    try {
      return await this.authService.register(
        data.email,
        data.password,
        data.name,
      );
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('auth_login')
  async login(data: { email: string; password: string }) {
    try {
      return await this.authService.login(data.email, data.password);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('validate_token')
  async validateToken(data: { token: string }) {
    try {
      return await this.authService.validateToken(data.token);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
