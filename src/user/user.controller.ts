import { Controller, Get, Param } from "@nestjs/common";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users')
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:login')
  getUserByLogin(@Param('login') login: string): Promise<User | undefined> {
    return this.userService.findByLogin(login);
  }
}