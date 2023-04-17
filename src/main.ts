import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppLogger } from './app.logger';
import { RedisIoAdapter } from './redis.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: new AppLogger(process.env.NODE_ENV)
  });
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);
  app.setGlobalPrefix('api');
  setupSwagger(app);
  await app.listen(3000);
}

function setupSwagger(app: INestApplication) {
  const builder = new DocumentBuilder();
  const config = builder
    .setTitle('SMMS MES API Document')
    .setDescription('Base URL: localhost:3000')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const options: SwaggerCustomOptions = {
    explorer: true, // 開啟搜尋列
  };
  SwaggerModule.setup('api', app, document, options);
}

bootstrap();