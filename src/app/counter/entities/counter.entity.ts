import { Field, ObjectType } from '@nestjs/graphql';
import { Service } from 'src/app/service/entities/service.entity';
import { BaseEntityObj } from 'src/common/classes/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
@ObjectType()
export class Counter extends BaseEntityObj {
  @Field(() => String)
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  serviceId: string;

  @ManyToOne(() => Service)
  service?: Service;
}
