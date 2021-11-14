import { HttpException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from "src/model/user/user.model";
import { User } from "src/entity/user.entity";
import { getUserEntityToUserDto } from "src/mapper/user-mapper";
import { hash } from "src/shared/hash";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private  userRepository: Repository<User>

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
    user.password = await hash(user.password);
    try {
      return await this.userRepository.save(user)
    } catch( error) {
      throw new HttpException('error save user', 400); 
    }
   
  }
}