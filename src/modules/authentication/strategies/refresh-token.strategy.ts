import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

const configService = new ConfigService()
@Injectable()
export default class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET_KEY'),
      jsonWebTokenOption: {
        maxAge: configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
      },
    })
  }
  async validate(payload: any) {
    return { id: payload.id, email: payload.email, exp: payload.exp }
  }
}
