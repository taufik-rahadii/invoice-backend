import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RoleService } from './services/role.service';
import { RoleResolver } from './resolvers/role.resolver';
import { Module } from '@nestjs/common';
import { RolePermission } from './entities/role-permission.entity';
import { RoleLoader } from './services/role.loader';
import { PermissionModule } from '../permission/permission.module';
import { RolePermissionResolver } from './resolvers/role-permission.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RolePermission]), PermissionModule],
  providers: [RoleService, RoleResolver, RoleLoader, RolePermissionResolver],
  exports: [RoleService, RoleLoader],
})
export class RoleModule {}
