import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule } from '@nestjs/swagger'
import { configDocumentation } from './configs'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

const configService = new ConfigService()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const document = SwaggerModule.createDocument(app, configDocumentation)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }))

  await app.listen(configService.get<string>('SERVER_PORT'))
}
bootstrap()
