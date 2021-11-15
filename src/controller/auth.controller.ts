import { Get, Post, UseGuards, Request, Controller } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guard/jwt-auth.guard";
import { LocalAuthGuard } from "src/guard/local-auth.guard";
import { ResponseToken } from "src/model/auth/response-token.model";
import { UserDTO } from "src/model/user/user.model";
import { AuthService } from "src/service/auth.service";

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req): Promise<ResponseToken> {
      return this.authService.login(req.user);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Request() req): Promise<UserDTO> {
      return req.user;
    }
}