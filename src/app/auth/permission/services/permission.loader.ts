import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entities/permission.entity';
import Dataloader from 'dataloader';
import { In, Repository } from 'typeorm';

@Injectable()
export class PermissionLoader {
  constructor(
    @InjectRepository(Permission) private readonly repo: Repository<Permission>,
  ) {}

  public readonly singlePermission = new Dataloader(async (codes: string[]) => {
    const permissions = await this.repo.find({
      where: {
        code: In(codes),
      },
      cache: 360000,
    });

    return codes.map((code) =>
      permissions.find((permission) => permission.code === code),
    );
  });
}
