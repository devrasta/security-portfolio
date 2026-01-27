import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5174',
    credentials: true,
  });

  app.use(helmet());
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
