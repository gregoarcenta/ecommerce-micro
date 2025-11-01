import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../common/services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { envConfig } from '../config/env.config';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: envConfig.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
})
export class AuthModule {}
