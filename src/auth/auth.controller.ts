import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthSerivce } from './auth.service';
import { UserDto } from 'src/users/dto/users.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthSerivce,
    private userService: UserService,
  ) {}
  @Post('registration')
  async registration(@Body() user: CreateUserDto) {
    const candidate = await this.userService.findUserByEmail(user?.email);
    if (candidate) {
      throw new HttpException(`Users with this ${user.email} exists`, 409);
    }

    if (user?.password !== user?.passwordConfirm) {
      throw new HttpException('passwords not match', 422);
    }

    const userData = await this.authService.registration(user);
    return userData;
  }

  @Post('login')
  async login(@Body() userAuth: UserDto) {
    const token = this.authService.login(userAuth);
    return token;
  }

  @Post('refresh-token')
  async refreshToken() {
    const refreshToken = 'get refresh token from cookie';

    const tokens = await this.authService.getTokens(refreshToken);
    return tokens;
  }
}
