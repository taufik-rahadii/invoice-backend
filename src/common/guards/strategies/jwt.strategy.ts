import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../../app/user/services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'AnjingTanah',
    });
  }

  name: string = 'jwt';

  async validate(payload: any) {
    if (!payload) return null;
    const { userId } = payload;

    try {
      const user = await this.userService.getDetailAndValidateUserById(userId);

      return user;
    } catch (error) {
      return null;
    }
  }
}
