import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class SignInDto {
  @IsOptional()
  @Field(() => String, { nullable: true })
  email?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  phone?: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false })
  password: string;
}

@ObjectType()
export class SignInRes {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
