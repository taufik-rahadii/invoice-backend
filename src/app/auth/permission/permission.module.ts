import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { PermissionSeeder } from './seeder/permission.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionSeeder],
  exports: [TypeOrmModule],
})
export class PermissionModule {}
