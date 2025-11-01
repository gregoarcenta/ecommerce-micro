import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envConfig } from './config/env.config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AllExceptionFilter } from './common/exceptions/all-exceptions.filter';

async function bootstrap() {
  const logger = new Logger('Auth MS');
  const host = envConfig.AUTH_HOST;
  const port = envConfig.AUTH_PORT;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { host, port },
    },
  );

  app.useGlobalFilters(new AllExceptionFilter());

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen();

  logger.log(`Auth Microservice is running on port ${port} at ${host}`);
}
bootstrap();
