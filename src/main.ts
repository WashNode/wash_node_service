import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 3000;
  const origin = configService.get<string>('ALLOWED_DOMAINS');
  const allowedOrigins = origin
    ? origin.split(',').map((o) => o.trim().replace(/\/$/, ''))
    : '*';

  app.enableCors({
    origin: allowedOrigins, // e.g., 'http://localhost:3000' or ['http://site1.com', 'http://site2.com']
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  const config = new DocumentBuilder()
    .setTitle('Wash Node Service API')
    .setDescription('API documentation for Wash Node Service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`);
}
void bootstrap();
