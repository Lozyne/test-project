import { HttpException, Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "src/conf/constant/provider.constant";
import { getUserEntityToUserDto } from "src/user/user-mapper";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { UserDTO } from "./model/user.model";

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,

    ) {}

  async findByLogin(login: string): Promise<UserDTO> {
    let userDto: UserDTO;
    await this.userRepository.findOne({
      where: {
        login,
      }
      
    }).then(
      (user) => userDto = getUserEntityToUserDto(user)  
    ).catch(error =>  Promise.reject(error));
    return userDto;
  }

  async createUser(user: UserDTO): Promise<User> {
      return await this.userRepository.save(user)
      .catch((error:HttpException) => Promise.reject(error));
  }
}