import { NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from '../../all-exceptions.filter';
import { json, urlencoded } from 'express';
import { AppModule } from '../../app.module';
import { Express } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

export const createApp = async (server: Express) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionsFilter());
  return app;
};
