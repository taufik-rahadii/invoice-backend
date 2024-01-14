// import { Injectable, Scope } from '@nestjs/common';
// import { RoleService } from './role.service';
// import DataLoader from 'dataloader';
// import { InjectRepository } from '@nestjs/typeorm';
// import { RolePermission } from '../entities/role-permission.entity';
// import { In, Repository } from 'typeorm';

// @Injectable({ scope: Scope.REQUEST })
// export class RoleLoader {
//   constructor(
//     private readonly roleService: RoleService,
//     @InjectRepository(RolePermission)
//     private readonly rolePermissioRepo: Repository<RolePermission>,
//   ) {}

//   public readonly batchRoles = new DataLoader(async (roleIds: string[]) => {
//     const roles = await this.roleService.getByIds(roleIds);
//     return roleIds.map((id) => roles.find((role) => role.id === id));
//   });

//   public readonly batchPermissions = new DataLoader(async (ids: string[]) => {
//     const permissions = await this.rolePermissioRepo.find({
//       where: {
//         roleId: In(ids),
//       },
//     });

//     return ids.map((id) =>
//       permissions.filter((permission) => permission.roleId === id),
//     );
//   });
// }
