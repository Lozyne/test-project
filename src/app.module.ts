import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './module/user.module';
import { AuthModule } from './module/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
