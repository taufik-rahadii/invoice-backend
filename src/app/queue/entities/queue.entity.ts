import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntityObj } from '../../../common/classes/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Queue extends BaseEntityObj {
  @Column({
    type: 'uuid',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  userId?: string;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  @Field(() => String, { nullable: false })
  serviceId: string;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  @Field(() => String, { nullable: false })
  counterId: string;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: true })
  queueNo: string;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  @Field(() => Date, { nullable: false })
  issuedAt: Date;
}
