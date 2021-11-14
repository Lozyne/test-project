import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConf: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5435,
  username: 'postgres',
  password: 'tahina',
  database: 'projectTest',
  entities: [
      __dirname + '/../**/*.entity{.ts,.js}',
  ],
  synchronize: true,
}