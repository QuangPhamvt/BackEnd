import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from 'src/entities'
import { AuthenticationService } from './authentication.service'
import { AuthenticationController } from './authentication.controller'
import { AccessTokenGuard, RefreshTokenGuard } from './guards'
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    AccessTokenGuard,
    AccessTokenStrategy,
    RefreshTokenGuard,
    RefreshTokenStrategy,
  ],
})
export class AuthenticationModule {}
