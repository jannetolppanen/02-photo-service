import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

// Strategy täytyy olla passport-jwt:n Strategy, muuten ei toimi
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // pitää olla sama kuin auth.module.ts:ssä
    });
  }
  async validate(payload: any): Promise<any> {
    // const user = await this.userService.findUserByUsername(payload.username);
    const user = await this.userService.findUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    console.log(`JwtStrategy: ${JSON.stringify(user)}`);
    return { id: user.id, username: user.username };
  }
}
