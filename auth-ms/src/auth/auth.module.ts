import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../common/services/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  // imports: [
  //   UsersModule,
  //   JwtModule.registerAsync({
  //     imports: [ConfigModule],
  //     useFactory: async (configService: ConfigService) => ({
  //       secret: envConfig,
  //       signOptions: {
  //         expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
  //       },
  //     }),
  //     inject: [ConfigService],
  //   }),
  // ],
})
export class AuthModule {}
