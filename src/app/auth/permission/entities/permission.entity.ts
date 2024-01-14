import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntityObj } from '../../../../common/classes/base.entity';
import { Column, Entity } from 'typeorm';
import { Action } from '../../role/entities/role-permission.entity';

@Entity()
@ObjectType()
export class Permission extends BaseEntityObj {
  @Column({
    type: 'varchar',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  groupCode?: string;

  @Column({
    type: 'varchar',
  })
  @Field(() => String)
  title: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  @Field(() => String)
  code: string;

  @Column({
    type: 'jsonb',
  })
  @Field(() => [String])
  availableActions: Action[];
}
