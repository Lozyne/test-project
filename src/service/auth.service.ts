import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/model/user/user.model';
import * as bcrypt from 'bcrypt';
import { ResponseToken } from 'src/model/auth/response-token.model';
import { User } from 'src/entity/user.entity';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService) {}

    async validateUser(login: string, password: string): Promise<UserDTO> {
      let userResult: UserDTO = null;
      try {
        const user: UserDTO = await this.usersService.findByLogin(login);

        if (user && user.password === password) {
  
          userResult = user;
        }
  
        return userResult;

      } catch(error) {
        throw new HttpException('error find login', 400); 
      }

    }

    async login(user: User): Promise<ResponseToken> {
        const payload = { login: user.login, sub: user.id };
        try {
          let token: string = this.jwtService.sign(payload);
          return new ResponseToken(token);
        } catch(error) {
          throw new HttpException('error token generation', 400);        
        }
  
      }

}
