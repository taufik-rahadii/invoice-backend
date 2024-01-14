import { Field, ObjectType } from '@nestjs/graphql';
import { Counter } from '../entities/counter.entity';
import { PaginationMetadataResponse } from '../../../common/pagination/pagination.response';

@ObjectType()
export class ListCounterRes {
  @Field(() => [Counter])
  data: Counter[];

  @Field(() => PaginationMetadataResponse)
  metadata: PaginationMetadataResponse;
}
