import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/const/auth.const';
import { AuthController } from 'src/controller/auth.controller';
import { UserModule } from 'src/module/user.module';
import { AuthService } from 'src/service/auth.service';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { LocalStrategy } from 'src/strategy/local.strategy';


@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 86400 },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy],

exports: [AuthService],
})
export class AuthModule {}
