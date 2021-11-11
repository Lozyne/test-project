import { Module } from "@nestjs/common";
import { UserController } from "src/user/user.controller";
import { DatabaseModule } from "src/database.module";
import { userProviders } from "src/user/user.provider";
import { UserService } from "src/user/user.service";

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