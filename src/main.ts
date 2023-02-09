import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppLogger } from './app.logger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
    logger: new AppLogger(process.env.NODE_ENV),
  });
  setupSwagger(app);
  await app.listen(4000);
}

function setupSwagger(app: INestApplication) {
  const builder = new DocumentBuilder();
  const config = builder
    .setTitle('SMMS MES API Document')
    .setDescription('Base URL: localhost:4000/api')
    .setVersion('1.0')
    .addApiKey(null, "token")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const options: SwaggerCustomOptions = {
    explorer: true, // 開啟搜尋列
  };
  SwaggerModule.setup('api', app, document, options);
}

bootstrap();