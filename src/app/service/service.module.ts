import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ServiceService } from './services/service.service';
import { ServiceResolver } from './resolvers/service.resolver';
import { ServiceLoader } from './services/service.loader';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  providers: [ServiceService, ServiceResolver, ServiceLoader],
  exports: [ServiceService, ServiceLoader],
})
export class ServiceModule {}
