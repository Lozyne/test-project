import { Module } from "@nestjs/common";
import { UserController } from "src/controller/user.controller";
import { DatabaseModule } from "src/database.module";
import { userProviders } from "src/repository/user.provider";
import { UserService } from "src/service/user.service";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [
      ...userProviders,
      UserService,
    ],
    exports: [UserService]
  })
  export class UserModule {}