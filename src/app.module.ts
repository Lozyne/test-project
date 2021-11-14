import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './module/user.module';
import { AuthModule } from './module/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { typeOrmConf } from './conf/database.providers';

@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forRoot(typeOrmConf)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}

}
