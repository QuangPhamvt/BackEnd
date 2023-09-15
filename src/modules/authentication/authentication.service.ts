import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { LogInDto, PayloadTokenDto, RegisterAuthDto } from './dto/index '
import { UserEntity } from 'src/entities'
import encryptPassword from 'src/utils/hashPassword'
import { JwtService } from '@nestjs/jwt'
import comparePassword from 'src/utils/comparePassword'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthenticationService {
  private readonly configService = new ConfigService()
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  // REGISTER
  async register(dto: RegisterAuthDto) {
    const { password = '', email = '' } = dto
    const isExist = await this.usersRepository.findOneBy({ email })

    if (isExist) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)

    const hashPassword = await encryptPassword(password)
    const user = this.usersRepository.create({ ...dto, password: hashPassword })
    await this.usersRepository.save(user)

    const userId = (await this.usersRepository.findOneBy({ email })).id
    return this.getTokens({ email, id: userId })
  }

  // LOGIN
  async logIn(dto: LogInDto) {
    const { password, email } = dto
    const user = await this.usersRepository.findOneBy({ email })
    const isPassword = comparePassword(password, user.password)
    if (!user || !isPassword)
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED, {
        description: 'WRONG PASSWORD OR EMAIL',
      })

    return await this.getTokens({ email: user.email, id: user.id })
  }

  // REFRESH TOKEN
  async refreshToken(dto: PayloadTokenDto) {
    const { email, id } = dto
    return await this.getTokens({ email, id })
  }

  // Setup Refresh Token and Access Token
  async getTokens(dto: PayloadTokenDto): Promise<{ access_token: string; refresh_token: string }> {
    const { email, id } = dto

    const AtToken = await this.jwtService.signAsync(
      //Payload
      { email, id },
      //Option
      {
        /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET_KEY'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
      },
    )
    const RtToken = await this.jwtService.signAsync(
      //Payload
      { email, id },
      //Option
      {
        /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET_KEY'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
      },
    )
    return { access_token: AtToken, refresh_token: RtToken }
  }
}
