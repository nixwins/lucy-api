import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import AppModule from './app.module';

const PORT = process.env.APP_PORT || 3000;

async function application() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Документация lucy-api')
    .setVersion('1.0.0')
    .build();
  const documnet = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, documnet);

  app.listen(PORT, () => console.log(`Application strated at PORT ${PORT}`));
}

application();
