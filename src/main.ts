import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { CustomValidationError } from './interfaces/response.interface';
import { SentryService } from '@ntegral/nestjs-sentry';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false,
    }),
  );

  app.useLogger(SentryService.SentryServiceInstance());

  const configService = app.get<ConfigService>(ConfigService);

  const appName = configService.get<string>('APP_NAME') ?? 'APP';
  const port = configService.get<number>('APP_PORT') ?? 8000;

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => {
          const { property, constraints } = error;

          const keys = Object.keys(constraints);

          const msgs: string[] = [];

          keys.forEach((key) => {
            msgs.push(`${constraints[key]}`);
          });

          return {
            field: property,
            messages: msgs,
          };
        });

        throw new UnprocessableEntityException({
          code: `APP-${HttpStatus.UNPROCESSABLE_ENTITY}`,
          message: 'Validation Error',
          status: false,
          errors: messages,
        } as CustomValidationError);
      },
    }),
  );

  await app.listen(port);
}

bootstrap();
