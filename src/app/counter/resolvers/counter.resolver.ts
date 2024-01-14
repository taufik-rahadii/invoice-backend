import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Counter } from '../entities/counter.entity';
import { CounterService } from '../services/counter.service';
import { CreateCounterDto } from '../dtos/create-counter.dto';
import { ListCounterRes } from '../dtos/list-counter.dto';
import { PaginationArgs } from '../../../common/pagination/pagination.args';
import { Service } from '../../service/entities/service.entity';
import { ServiceLoader } from '../../service/services/service.loader';
import { UpdateCounterDto } from '../dtos/update-counter.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../../common/guards/jwt.guard';
import { RoleGuard } from '../../../common/guards/role.guard';
import { Permission } from '../../../common/decorators/permission.decorator';

@Resolver(() => Counter)
@UseGuards(JwtGuard, RoleGuard)
export class CounterResolver {
  constructor(
    private readonly service: CounterService,
    private readonly serviceLoader: ServiceLoader,
  ) {}

  @Query(() => ListCounterRes)
  @Permission('counter.read')
  listCounter(
    @Args('pagination', { type: () => PaginationArgs })
    pagination: PaginationArgs,
  ) {
    return this.service.listItem(pagination);
  }

  @Query(() => Counter)
  @Permission('counter.read')
  detailCounter(@Args('id', { type: () => String }) id: string) {
    return this.service.getAndValidateById(id);
  }

  @Mutation(() => Counter)
  @Permission('counter.create')
  createCounter(@Args() payload: CreateCounterDto) {
    return this.service.createItem(payload);
  }

  @Mutation(() => Counter)
  @Permission('counter.update')
  updateCounter(
    @Args('id', { type: () => String }) id: string,
    @Args() payload: UpdateCounterDto,
  ) {
    return this.service.updateItem(id, payload);
  }

  @Mutation(() => Boolean)
  @Permission('counter.delete')
  deleteCounter(@Args('id', { type: () => String }) id: string) {
    return this.service.deleteItem(id);
  }

  @ResolveField(() => Service, { name: 'service' })
  getService(@Parent() counter: Counter) {
    return this.serviceLoader.singleService.load(counter.serviceId);
  }
}
