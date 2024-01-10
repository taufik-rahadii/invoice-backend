import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Counter } from './entities/counter.entity';
import { CounterService } from './services/counter.service';
import { CounterResolver } from './resolvers/counter.resolver';
import { ServiceModule } from '../service/service.module';

@Module({
  imports: [TypeOrmModule.forFeature([Counter]), ServiceModule],
  providers: [CounterService, CounterResolver],
  exports: [CounterService, TypeOrmModule],
})
export class CounterModule {}
