import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Service } from '../entities/service.entity';
import { ServiceService } from '../services/service.service';
import { PaginationArgs } from '../../../common/pagination/pagination.args';
import { ListServiceRes } from '../dtos/list-service.dto';
import { CreateServiceDto } from '../dtos/create-service.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../../common/guards/jwt.guard';
import { RoleGuard } from '../../../common/guards/role.guard';
import { Permission } from '../../../common/decorators/permission.decorator';
import { UpdateServiceDto } from '../dtos/update-service.dto';

@Resolver(() => Service)
@UseGuards(JwtGuard, RoleGuard)
export class ServiceResolver {
  constructor(private readonly service: ServiceService) {}

  @Query(() => ListServiceRes)
  @Permission('services.read')
  listService(
    @Args('pagination', { type: () => PaginationArgs })
    pagination: PaginationArgs,
  ) {
    return this.service.listItem(pagination);
  }

  @Mutation(() => Service)
  @Permission('services.create')
  createService(@Args() payload: CreateServiceDto) {
    return this.service.createItem(payload);
  }

  @Mutation(() => Service)
  @Permission('services.update')
  updateService(
    @Args('id', { type: () => String }) id: string,
    @Args() payload: UpdateServiceDto,
  ) {
    return this.service.updateItem(id, payload);
  }

  @Mutation(() => Boolean)
  @Permission('service.delete')
  deleteService(@Args('id', { type: () => String }) id: string) {
    return this.service.deleteItem(id);
  }
}
