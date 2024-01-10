import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { PermissionSeeder } from './seeder/permission.seeder';
import { PermissionLoader } from './services/permission.loader';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionSeeder, PermissionLoader],
  exports: [TypeOrmModule, PermissionLoader],
})
export class PermissionModule {}
