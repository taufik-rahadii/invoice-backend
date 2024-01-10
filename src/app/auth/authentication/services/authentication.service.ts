import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from '../../../user/services/user.service';
import { SignInDto, SignInRes } from '../dtos/signin.dto';
import { isNotEmpty } from 'class-validator';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../user/entities/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public generateAccessTokenAndRefreshToken(user: User): SignInRes {
    const tokenPayload = {
      userId: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
    };

    const accessToken = this.jwtService.sign(tokenPayload);
    const refreshToken = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: '12m' },
    );

    return {
      userId: user.id,
      accessToken,
      refreshToken,
    };
  }

  // refresh session
  public async refreshSession(authHeader: string) {
    if (!authHeader) throw new ForbiddenException(`No Session Provided`);
    const [_, token] = authHeader.split(' ');
    const payload = this.jwtService.verify(token);

    const user = await this.userService.getDetailAndValidateUserById(
      payload.userId,
    );

    return this.generateAccessTokenAndRefreshToken(user);
  }

  //   signIn user
  public async signInUser(payload: SignInDto) {
    try {
      const credential = isNotEmpty(payload.phone) ? 'phone' : 'email';
      const user = await this.userService.getDetailUser(
        credential,
        payload[credential],
      );

      if (!user)
        throw new UnprocessableEntityException({
          message: 'User Not Found',
          status: false,
          code: 'USER-404',
        });

      const pass = compareSync(payload.password, user.password);
      if (!pass)
        throw new UnprocessableEntityException({
          message: 'Wrong password',
          status: false,
          code: 'USER-4301',
        });

      return this.generateAccessTokenAndRefreshToken(user);
    } catch (error) {
      throw error;
    }
  }
  // register user
}
