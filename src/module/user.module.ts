import { Module } from "@nestjs/common";
import { UserController } from "src/controller/user.controller";
import { User } from "src/entity/user.entity";
import { UserService } from "src/service/user.service";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [
      UserService,
    ],
    exports: [UserService]
  })
  export class UserModule {}