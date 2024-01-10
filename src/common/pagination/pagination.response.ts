import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationMetadataResponse {
  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  offset: number;

  @Field(() => String, { nullable: true })
  search: string;

  @Field(() => Int)
  total: number;
}
