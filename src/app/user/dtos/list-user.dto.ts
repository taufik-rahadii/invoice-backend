import { PaginationMetadataResponse } from '../../../common/pagination/pagination.response';
import { User } from '../entities/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ListUserRes {
  @Field(() => [User])
  data: User[];

  @Field(() => PaginationMetadataResponse)
  metadata: PaginationMetadataResponse;
}
