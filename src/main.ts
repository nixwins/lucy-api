import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';

const PORT = process.env.APP_PORT || 3000;

async function application() {
  const app = await NestFactory.create(AppModule);
  app.listen(PORT, () => console.log(`Application strated at PORT ${PORT}`));
}

application();
