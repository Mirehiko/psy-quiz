import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenService } from '../token/token.service';
import { UserEntity } from '../user/schemas/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService, private readonly tokenService: TokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true
    });
  }

  async validate(req, user: Partial<UserEntity>) {
    const token = req.headers.authorization.slice(7);
    const tokenExists = await this.tokenService.exists(token);
    if (tokenExists) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
