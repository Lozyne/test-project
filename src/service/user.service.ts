import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "src/constant/provider.constant";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // TODO: find by mail
}