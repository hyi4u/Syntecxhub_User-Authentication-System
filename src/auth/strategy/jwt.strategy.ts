import { UsersService } from './../../users/users.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }
  async validate(payload: any) {
    if (!payload || !payload.username) {
      throw new UnauthorizedException('Invalid token payload');
    }
    const user = await this.usersService.findOne(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.accountStatus !== 'active') {
      throw new BadRequestException('the user email not active');
    }
    return { userId: payload.sub, username: user.username };
  }
}
