import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Action } from '../entities/role-permission.entity';

@InputType()
export class CreateRolePermissions {
  @Field(() => String)
  code: string;

  @Field(() => [String])
  actions: Action[];
}

@ArgsType()
export class CreateRoleDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => CreateRolePermissions)
  @IsArray()
  @Field(() => [CreateRolePermissions])
  permissions: CreateRolePermissions[];
}
