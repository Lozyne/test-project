import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserDTO } from "src/model/user/user.model";
import { User } from "../entity/user.entity";
import { UserService } from "../service/user.service";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:login')
  getUserByLogin(@Param('login') login: string): Promise<UserDTO | undefined> {
    return this.userService.findByLogin(login);
  }

  @Post('/create')
  createUser(@Body() user: UserDTO): Promise<User | undefined> {
    return this.userService.createUser(user);
  }
}