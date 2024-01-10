import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
import { RoleModule } from '../auth/role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RoleModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
