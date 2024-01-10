import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const UserInfo = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const user = GqlExecutionContext.create(ctx).getContext().req?.user;

    return data ? user?.[data] : user;
  },
);
