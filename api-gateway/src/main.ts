import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { envConfig } from './config';
import { ApiResponseInterceptor } from './common';

async function bootstrap() {
  const logger = new Logger('API Gateway');
  const app = await NestFactory.create(AppModule);
  const port = envConfig.PORT;
  const appName = envConfig.APP_NAME;
  const globalPrefix = 'api';

  // CORS
  app.enableCors();

  // Global Prefix
  app.setGlobalPrefix(globalPrefix);

  // Global Interceptors
  app.useGlobalInterceptors(new ApiResponseInterceptor());

  // Global Filters
  // app.useGlobalFilters(new ApiExceptionFilter());

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

  await app.listen(port);

  logger.log(
    `API Gateway is running on http://localhost:${port}/${globalPrefix}`,
  );
  logger.log(
    `Swagger is available at http://localhost:${port}/${globalPrefix}/docs`,
  );
}
bootstrap();
