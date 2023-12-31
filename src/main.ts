import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { urlencoded, json } from 'express';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // app.use(json({ limit: '50mb' }));
  // app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.use(function (req, res, next) {
    if (!req.path.includes('webhook')) {
      return next();
    }

    let data = '';
    req.on('data', function (chunk) {
      data += chunk;
    });
    req.on('end', function () {
      req.digest = data;
      next();
    });
  });

  await app.listen(3002);
}
bootstrap();
