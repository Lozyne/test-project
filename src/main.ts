import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  origin: true;
    preflightContinue: false;

  const config = new DocumentBuilder()
    .setTitle('Documentation')
    .setDescription('')
    .setVersion('1.0')
    .addTag('documentation')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8000);

}
bootstrap();
