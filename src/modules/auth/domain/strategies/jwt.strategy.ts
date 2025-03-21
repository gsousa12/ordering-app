import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AppConfig } from 'src/config/app.config';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (req && req.cookies) {
            return req.cookies['access_token'];
          }
          return null;
        },
      ]),
      secretOrKey: String(process.env.JWT_SECRET),
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
