import { HttpException, Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "src/conf/constant/provider.constant";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { UserDTO } from "src/model/user/user.model";
import { User } from "src/entity/user.entity";
import { getUserEntityToUserDto } from "src/mapper/user-mapper";

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
    const salt = await bcrypt.genSalt();
    const hash: string = await bcrypt.hash(user.password, salt);
    user.password = hash;

    return await this.userRepository.save(user)
      .catch((error:HttpException) => Promise.reject(error));
  }
}