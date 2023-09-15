import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsStrongPassword } from 'class-validator'
import AuthDto from './auth.dto'

export default class RegisterAuthDto implements AuthDto {
  @IsEmail()
  @ApiProperty({ default: 'quang0908498476@gmail.com' })
  email: string

  @IsStrongPassword()
  @ApiProperty({ default: 'CustomAFK@22052003' })
  password: string
}
