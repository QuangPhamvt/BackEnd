/**
 * LINK: https://docs.nestjs.com/techniques/database#custom-datasource-factory
 */
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm'
// import { DataSource } from 'typeorm'

export default class typeOrmConfig {
  static getTypeOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      /**
       * Database type.
       */
      type: 'mysql',
      /**
       * TypeORM will automatically use package found in your node_modules, prioritizing mysql over mysql2,
       * but you can specify it manually
       */
      connectorPackage: 'mysql2',
      /**
       * Maximum number of clients the pool should contain.
       */
      poolSize: 50,
      /**
       * Database host.
       */
      host: configService.get<string>('DATABASE_HOST') || 'localhost',
      /**
       * Database host port.
       */
      port: +configService.get<string>('DATABASE_PORT'),
      /**
       * Database username.
       */
      username: configService.get<string>('DATABASE_USERNAME'),
      /**
       * Database password.
       */
      password: configService.get<string>('DATABASE_PASSWORD'),
      /**
       * Database database
       */
      database: configService.get<string>('DATABASE_DATABASE'),
      /**
       * Entities to be loaded for this connection.
       * Accepts both entity classes and directories where from entities need to be loaded.
       * Directories support glob patterns.
       */
      entities: [__dirname + '../**/*.entity{.js,.ts}'],
      /**
       * Migrations to be loaded for this connection.
       * Accepts both migration classes and glob patterns representing migration files.
       */
      migrations: [__dirname + '../migrations/*{.js,.ts}'],
      /**
       * Indicates if database schema should be auto created on every application launch.
       * Be careful with this option and don't use this in production - otherwise you can lose production data.
       * This option is useful during debug and development.
       * Alternative to it, you can use CLI and run schema:sync command.
       *
       * Note that for MongoDB database it does not create schema, because MongoDB is schemaless.
       * Instead, it syncs just by creating indices.
       */
      synchronize: true,
      /**
       * Logging options.
       */
      logging: true,

      autoLoadEntities: true,
    }
  }
}

export const typeOrmModuleAsyncOption: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  // Use useFactory, useClass, or useExisting
  // to configure the DataSourceOptions.
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> =>
    typeOrmConfig.getTypeOrmConfig(configService),
}
