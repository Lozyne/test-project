import { DATABASE_CONNECTION, USER_REPOSITORY } from "src/conf/constant/provider.constant";
import { Connection } from "typeorm";
import { User } from "../entity/user.entity";

export const userProviders = [
    {
      provide: USER_REPOSITORY,
      useFactory: (connection: Connection) => connection.getRepository(User),
      inject: [DATABASE_CONNECTION],
    },
  ];