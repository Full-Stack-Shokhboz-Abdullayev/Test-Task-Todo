import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import swaggerConfig from './common/config/swagger.config';
import { MongoErrorFilter } from './common/filters/mongo-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // dto validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  // mongodb related exception filter
  app.useGlobalFilters(new MongoErrorFilter());

  // swagger config for backend testing
  swaggerConfig(app);

  // xss protection with helmet
  app.use(helmet());

  app.enableCors({
    origin: configService.get('CORS_ORIGIN') || '*',
  });

  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
