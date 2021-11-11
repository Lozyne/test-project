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


  async findByLogin(login: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        login,
      }
      
    });
  }
  
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

}