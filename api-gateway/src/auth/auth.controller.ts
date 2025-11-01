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
import { GetUser } from './decoratos/get-user.decorator';

import express from 'express';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  @Post('register')
  signUp(@Body() registerDto: any) {
    return this.authClient.send('auth_register', registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() loginDto: any) {
    return this.authClient.send('auth_login', loginDto);
  }

  @Get('check-status')
  @Auth()
  checkStatus(@GetUser() user: any, @Request() req: express.Request) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '');

    console.log(token);
    return this.authClient.send('validate_token', { token });
  }
}
