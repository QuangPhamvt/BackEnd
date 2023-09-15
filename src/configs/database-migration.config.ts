import { ConfigService } from '@nestjs/config'
import { DataSource, DataSourceOptions } from 'typeorm'
import { config } from 'dotenv'

config()

const configService = new ConfigService()

const option: DataSourceOptions = {
  /**
   * Database type.
   */
  type: 'mysql',
  /**
   * Database host.
   */
  host: configService.get<string>('DATABASE_HOST'),
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
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  /**
   * Migrations to be loaded for this connection.
   * Accepts both migration classes and glob patterns representing migration files.
   */
  migrations: [__dirname + '/../migrations/*.{js,ts}'],
  /**
   * Migrations table name, in case of different name from "migrations".
   * Accepts single string name.
   */
  migrationsTableName: 'migration_database',
  /**
   * Indicates if database schema should be auto created on every application launch.
   * Be careful with this option and don't use this in production - otherwise you can lose production data.
   * This option is useful during debug and development.
   * Alternative to it, you can use CLI and run schema:sync command.
   *
   * Note that for MongoDB database it does not create schema, because MongoDB is schemaless.
   * Instead, it syncs just by creating indices.
   */
  synchronize: false,
  /**
   * Logging options.
   */
  logging: true,
}
export const dataSource = new DataSource(option)
