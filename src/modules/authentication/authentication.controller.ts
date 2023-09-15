import { Request } from 'express'
import { LogInDto, RegisterAuthDto } from './dto/index '
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Post, HttpCode, Get, Req, UseGuards } from '@nestjs/common'
import { AccessTokenGuard, RefreshTokenGuard } from './guards'
import { AuthenticationService } from './authentication.service'

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  // /auth/register
  @Post('/register')
  @HttpCode(201)
  register(@Body() registerAuth: RegisterAuthDto) {
    return this.authenticationService.register(registerAuth)
  }

  // /auth/login
  @Post('/login')
  @HttpCode(201)
  login(@Body() login: LogInDto) {
    return this.authenticationService.logIn(login)
  }

  // /auth/refresh
  @Get('/refresh')
  @HttpCode(201)
  @ApiBearerAuth('access-token')
  @UseGuards(RefreshTokenGuard)
  refresh(@Req() request) {
    const { id, email } = request.user
    return this.authenticationService.refreshToken({ id, email })
  }

  // /auth/profile
  @Get('/profile')
  @HttpCode(201)
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  profile(@Req() request: Request) {
    return request.headers
  }
}
