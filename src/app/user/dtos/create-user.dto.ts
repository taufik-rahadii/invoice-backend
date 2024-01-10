import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateUserDto {
  @Field(() => String, { nullable: false })
  firstname: string;

  @Field(() => String, { nullable: true })
  lastname?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => String, { nullable: false })
  roleId: string;
}
