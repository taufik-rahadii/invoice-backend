import { Field, ObjectType } from '@nestjs/graphql';
import { genSaltSync, hashSync } from 'bcrypt';
import { isNotEmpty } from 'class-validator';
import { Role } from '../../auth/role/entities/role.entity';
import { BaseEntityObj } from '../../../common/classes/base.entity';
import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';

@Entity()
@ObjectType()
export class User extends BaseEntityObj {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  @Field(() => String, { nullable: false })
  firstname: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  lastname?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  phone?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  email?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  password?: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  @Field(() => String, { nullable: false })
  roleId: string;

  @ManyToOne(() => Role)
  role?: Role;

  @BeforeInsert()
  setPassword() {
    if (isNotEmpty(this.password))
      this.password = hashSync(this.password, genSaltSync(12, 'a'));
  }
}
