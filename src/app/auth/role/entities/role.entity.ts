import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntityObj } from 'src/common/classes/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { RolePermission } from './role-permission.entity';

@Entity()
@ObjectType()
export class Role extends BaseEntityObj {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  @Field(() => String, { nullable: false })
  name: string;

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role, {
    cascade: ['insert', 'update'],
  })
  @Field(() => [RolePermission], { nullable: true })
  permissions: RolePermission[];
}
