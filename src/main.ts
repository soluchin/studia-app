import './config/env.config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { QueryErrorFilter } from './utils/query-error-filter.util';

const port = process.env.APP_PORT || 3000;
const apiPrefix = process.env.API_PREFIX || 'api';

async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  
  app.setGlobalPrefix(apiPrefix);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'frontend', 'dist'));
  app.useGlobalFilters(new QueryErrorFilter(httpAdapter));

  await app.listen(port);
  console.info(`\nApplication is running on: http://localhost:${port}\n`);
}
bootstrap();
