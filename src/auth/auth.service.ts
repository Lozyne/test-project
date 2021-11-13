import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResponseToken } from 'src/response-token.model';
import { UserDTO } from 'src/user/model/user.model';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService) {}

    async validateUser(login: string, password: string): Promise<UserDTO> {
      let userResult: UserDTO = null;
      const user: UserDTO = await this.usersService.findByLogin(login);

      if (user && user.password === password) {

        userResult = user;
      }

      return userResult;
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
