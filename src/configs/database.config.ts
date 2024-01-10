import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: (env: ConfigService) => ({
        type: 'postgres',
        host: env.get<string>('DB_HOST'),
        port: env.get<number>('DB_PORT'),
        username: env.get<string>('DB_USERNAME'),
        password: env.get<string>('DB_PASSWORD'),
        database: env.get<string>('DB_NAME'),
        synchronize: env.get<boolean>('DB_SYNC'),
        logging: env.get<boolean>('DB_LOGGING') ? ['query'] : [],
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseConfig {}
