import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntityObj } from 'src/common/classes/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Service extends BaseEntityObj {
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;
}
