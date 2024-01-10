import { ClassConstructor } from 'class-transformer';
import { ServiceBase } from './service.base';
import { Resolver } from '@nestjs/graphql';

class ResolverBase<Entity> {
  constructor(private readonly service: ServiceBase<Entity>) {}

  listItem() {}
}
