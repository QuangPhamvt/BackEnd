import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { configModuleOptions, typeOrmModuleAsyncOption } from './configs'
import Modules from './modules'

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRootAsync(typeOrmModuleAsyncOption),
    ...Modules,
  ],
  providers: [],
})
export class AppModule {}
