import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
} from '@nestjs/common';
import { AUTH_SERVICE } from '../config';
import { ClientProxy } from '@nestjs/microservices';
import { Auth } from './decoratos/auth.decorator';
import express from 'express';
import { ApiDocs } from '../common';
import { authSwaggerConfig } from '../swagger/auth.swagger';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  @Post('register')
  @ApiDocs(authSwaggerConfig.register)
  register(@Body() registerDto: any) {
    return this.authClient.send('auth_register', registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiDocs(authSwaggerConfig.login)
  login(@Body() loginDto: any) {
    return this.authClient.send('auth_login', loginDto);
  }

  @Get('check-status')
  @Auth()
  @ApiDocs(authSwaggerConfig.checkStatus)
  checkStatus(@Request() req: express.Request) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '');
    return this.authClient.send('validate_token', { token });
  }
}
