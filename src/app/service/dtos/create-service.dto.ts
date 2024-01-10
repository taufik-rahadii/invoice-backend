import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class CreateServiceDto {
  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;
}
