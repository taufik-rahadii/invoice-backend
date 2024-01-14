import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { In, Repository } from 'typeorm';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { RolePermission } from '../entities/role-permission.entity';
import { ServiceBase } from '../../../../common/base/service.base';

@Injectable()
export class RoleService extends ServiceBase<Role> {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
  ) {
    super(roleRepo);
  }

  public async createRole(payload: CreateRoleDto) {
    try {
      return await this.roleRepo.save(
        this.roleRepo.create({
          ...payload,
          permissions: payload.permissions.map(
            (permission) =>
              ({
                permissionCode: permission.code,
                actions: permission.actions,
              }) as RolePermission,
          ),
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  public async listRole() {
    return await this.roleRepo.find();
  }

  public async getByIds(ids: string[]) {
    return await this.roleRepo.find({
      where: {
        id: In(ids),
      },
    });
  }
}
