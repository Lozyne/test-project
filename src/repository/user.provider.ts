import { DATABASE_CONNECTION, USER_REPOSITORY } from "src/constant/provider.constant";
import { User } from "src/entity/user.entity";
import { Connection } from "typeorm";

export const userProviders = [
    {
      provide: USER_REPOSITORY,
      useFactory: (connection: Connection) => connection.getRepository(User),
      inject: [DATABASE_CONNECTION],
    },
  ];