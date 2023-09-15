import { ConfigModuleOptions } from '@nestjs/config'

export const configModuleOptions: ConfigModuleOptions = {
  /**
   * If "true", registers `ConfigModule` as a global module.
   * See: https://docs.nestjs.com/modules#global-modules
   */
  isGlobal: true,
  /**
   * Path to the environment file(s) to be loaded.
   */
  envFilePath: '.env',
}
