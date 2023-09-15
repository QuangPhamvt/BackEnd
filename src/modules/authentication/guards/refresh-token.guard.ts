import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export default class RefreshTokenGuard extends AuthGuard('jwt-refresh') {}
