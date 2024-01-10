import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntityObj } from 'src/common/classes/base.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from '../../permission/entities/permission.entity';

export type Action = 'read' | 'create' | 'update' | 'delete';

@Entity()
@ObjectType()
export class RolePermission extends BaseEntityObj {
  @Column({ type: 'uuid', nullable: false })
  @Field(() => String)
  roleId: string;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String)
  permissionCode: string;

  @Column({ type: 'jsonb', nullable: false })
  @Field(() => [String])
  actions: Action[];

  @ManyToOne(() => Role)
  role?: Role;

  @OneToOne(() => Permission)
  permission?: Permission;
}
