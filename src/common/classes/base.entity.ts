import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class BaseEntityObj extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { nullable: false })
  id?: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
  })
  @Field(() => Date, { nullable: false })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
  })
  @Field(() => Date, { nullable: false })
  updatedAt?: Date;

  @DeleteDateColumn({
    type: 'timestamp without time zone',
  })
  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
}
