import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { SignInDto, SignInRes } from '../dtos/signin.dto';
import { AuthenticationService } from '../services/authentication.service';

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
