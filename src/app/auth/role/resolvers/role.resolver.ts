import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Role } from '../entities/role.entity';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { RolePermission } from '../entities/role-permission.entity';
import { RoleLoader } from '../services/role.loader';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../../../common/guards/jwt.guard';
import { RoleGuard } from '../../../../common/guards/role.guard';
import { Permission } from '../../../../common/decorators/permission.decorator';

@Resolver(() => Role)
@UseGuards(JwtGuard, RoleGuard)
export class RoleResolver {
  constructor(
    private readonly roleService: RoleService,
    private readonly roleLoader: RoleLoader,
  ) {}

  @Mutation(() => Role)
  @Permission('roles.create')
  createRole(@Args() role: CreateRoleDto) {
    return this.roleService.createRole(role);
  }

  @Query(() => [Role])
  @Permission('roles.read')
  listRoles() {
    return this.roleService.listRole();
  }

  //   Role Permission Resolver
  @ResolveField(() => [RolePermission], { nullable: true })
  permissions(@Parent() role: Role) {
    const { id } = role;

    return this.roleLoader.batchPermissions.load(id);
  }
}
