import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Request } from 'express';
import { DatabaseConfig } from './configs/database.config';
import { join } from 'path';
import { UserModule } from './app/user/user.module';
import { RoleModule } from './app/auth/role/role.module';
import { PermissionModule } from './app/auth/permission/permission.module';
import { GraphqlInterceptor, SentryModule } from '@ntegral/nestjs-sentry';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import * as pg from 'pg';
import { AuthenticationModule } from './app/auth/authentication/authentication.module';
import { ServiceModule } from './app/service/service.module';
import { CounterModule } from './app/counter/counter.module';
import { QueueModule } from './app/queue/queue.module';
import { RoleResolver } from './app/auth/role/resolvers/role.resolver';
import { UserResolver } from './app/user/resolvers/user.resolver';
import { AuthenticationResolver } from './app/auth/authentication/resolvers/authentication.resolver';

@Module({
  imports: [
    // GraphQL Initiate
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   path: '/ql',
    //   autoSchemaFile: false,
    //   context: ({ req }: { req: Request }) => req,
    //   playground: true,
    //   typePaths: ['./**/*.gql'],
    // }),

    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (env: ConfigService) => ({
        dsn: 'https://dac7184e2ecc79979d60aec2496fcb0d@o4506519736221696.ingest.sentry.io/4506519739498496',
        logLevels: ['log', 'error', 'debug', 'verbose', 'warn'],
        tracesSampleRate: 1.0,
        integrations: [
          new Sentry.Integrations.Apollo({ useNestjs: true }),
          new Sentry.Integrations.Postgres({ module: pg }),
        ],
      }),
      inject: [ConfigService],
    }),

    // DB Initiate
    DatabaseConfig,

    // Application modules
    RoleModule,
    UserModule,
    PermissionModule,
    AuthenticationModule,
    ServiceModule,
    CounterModule,
    QueueModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => new GraphqlInterceptor(),
    },
  ],
})
export class AppModule {}
