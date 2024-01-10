import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMetadataResponse } from 'src/common/pagination/pagination.response';
import { Service } from '../entities/service.entity';

@ObjectType()
export class ServicePaginationResponse {
  @Field(() => PaginationMetadataResponse)
  metadata: PaginationMetadataResponse;
}

@ObjectType()
export class ListServiceRes extends ServicePaginationResponse {
  @Field(() => [Service])
  data: Service[];
}
