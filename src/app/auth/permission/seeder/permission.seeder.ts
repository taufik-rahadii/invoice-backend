import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entities/permission.entity';
import { Repository } from 'typeorm';
import { Permissions } from './permission.data';

@Injectable()
export class PermissionSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(Permission) private readonly repo: Repository<Permission>,
  ) {}

  onModuleInit() {
    this.seed();
  }

  async seed() {
    await this.repo.save(Permissions);

    Logger.log(`Success seeding permission`, PermissionSeeder.name);
  }
}
