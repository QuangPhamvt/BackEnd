import RegisterAuthDto from './register-auth.dto'
import AuthDto from './auth.dto'
import { ApiProperty } from '@nestjs/swagger'
interface PayloadTokenDto {
  id: number
  email: string
}

class LogInDto {
  @ApiProperty({ default: 'quang0908498476@gmail.com' })
  email: string
  @ApiProperty({ default: 'CustomAFK@22052003' })
  password: string
}
export { PayloadTokenDto, AuthDto, RegisterAuthDto, LogInDto }
