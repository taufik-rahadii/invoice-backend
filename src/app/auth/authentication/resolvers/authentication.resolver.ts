import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { SignInDto, SignInRes } from '../dtos/signin.dto';
import { AuthenticationService } from '../services/authentication.service';
import { Headers, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { UserInfo } from 'src/common/decorators/userinfo.decorator';
import { User } from 'src/app/user/entities/user.entity';

@Resolver()
export class AuthenticationResolver {
  constructor(private readonly authService: AuthenticationService) {}

  @Mutation(() => SignInRes)
  signIn(@Args() payload: SignInDto) {
    return this.authService.signInUser(payload);
  }

  @Mutation(() => SignInRes)
  refreshSession(@Context() req: any) {
    console.log(req.req.headers);
    return this.authService.refreshSession(req.req.headers.authorization);
  }
}
// login google
// login by phone or email
// register by phone
// refresh session
