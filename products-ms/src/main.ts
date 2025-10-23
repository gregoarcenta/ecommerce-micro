import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiResponseInterceptor } from './common/interceptors/api-response.interceptor';
import { ApiExceptionFilter } from './common/filters/api-exception.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Config Service
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const appName = configService.get('APP_NAME');

  // CORS
  app.enableCors();

  // Global Prefix
  app.setGlobalPrefix('api');

  // Global Interceptors
  app.useGlobalInterceptors(new ApiResponseInterceptor());

  // Global Filters
  app.useGlobalFilters(new ApiExceptionFilter());

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

  // Swagger
  const config = new DocumentBuilder()
    .setTitle(`${appName} RESTful API`)
    .setDescription(`${appName} endpoints`)
    .setVersion('1.0')
    .addTag('Products', 'Product management endpoints')
    .addBearerAuth()
    .setContact(
      'Gregory Arcentales',
      'https://arcentales.vercel.app',
      'gregoarcenta@gmail.com',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3000', 'Development server')
    .addServer('https://api.yourapp.com', 'Production server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'E-commerce API Docs',
    customfavIcon: 'https://yourapp.com/favicon.ico',
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });

  await app.listen(port, () => {
    logger.log(`Microservice "products" is running on port ${port}`);
  });
}

bootstrap();
