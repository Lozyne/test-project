import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UserDTO } from './model/user/user.model';
import { ResponseToken } from './model/auth/response-token.model';

@Controller()
export class AppController {
  constructor( private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req): Promise<ResponseToken> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): Promise<UserDTO> {
    return req.user;
  }
}
