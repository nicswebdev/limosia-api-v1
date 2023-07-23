import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  if (process.env.NODE_ENV !== 'PRODUCTION') {
    const config = new DocumentBuilder()
      .setTitle('Limosia Backend')
      .setDescription('Limosia API Backend Architecture')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('documentation', app, document);
  }

  await app.listen(process.env.PORT);
}
bootstrap();
