import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { UserDTO } from "./model/user.model";

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