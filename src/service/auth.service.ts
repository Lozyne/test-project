import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/model/user/user.model';
import { ResponseToken } from 'src/model/auth/response-token.model';
import { User } from 'src/entity/user.entity';
import { UserService } from './user.service';
import { hash } from 'src/shared/hash';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService) {}

    async validateUser(login: string, password: string): Promise<UserDTO> {
      let userResult: UserDTO = null;
      try {
        const user: UserDTO = await this.usersService.findByLogin(login);
        const verifyMatchForPassword = await bcrypt.compare(password, user.password);
        if (user && verifyMatchForPassword) {
  
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
