import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/users.dto';
import { compare, hash } from 'bcrypt';
import { TokenService } from 'src/tokens/tokens.service';

@Injectable()
export class AuthSerivce {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registration(newUser: CreateUserDto) {
    try {
      const hashPassword: string = await hash(newUser.password, 10);

      const createdUser = await this.userService.create({
        email: newUser.email,
        password: hashPassword,
      });

      createdUser.password = undefined;

      const tokens = await this.tokenService.generateTokens(createdUser);
      await this.tokenService.saveRefreshToken(
        createdUser.id,
        tokens.refreshToken,
      );
      return {
        ...tokens,
        user: createdUser,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async login({ email, password }: UserDto) {
    const user = await this.validateUser(email, password);
    const tokens = await this.tokenService.generateTokens(user);
    await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }

  private async validateUser(email: string, password: string) {
    const userFromDB = await this.userService.findUserByEmail(email);
    if (!userFromDB) {
      throw new UnauthorizedException('Login or password wrong');
    }

    const isCorrectUser = await compare(password, userFromDB.password);
    if (!isCorrectUser) {
      throw new UnauthorizedException('Login or password wrong');
    }

    return {
      id: userFromDB.id,
      email: userFromDB.email,
    };
  }

  private async validateRefreshToken(token: string) {
    const refreshTokenFromDB = await this.tokenService.findOne({
      refreshToken: token,
    });
    if (!refreshTokenFromDB) {
      throw new BadRequestException('tokens is not found');
    }
    const currentTime = new Date().getTime();
    const tokenExpiresTime = new Date(refreshTokenFromDB.expires).getTime();
    if (currentTime > tokenExpiresTime) {
      throw new UnauthorizedException('Refresh token is invalid');
    }

    return refreshTokenFromDB.userId;
  }

  async getTokens(token) {
    const userId = await this.validateRefreshToken(token);

    try {
      const user = await this.userService.findUserById(userId);
      const tokens = await this.tokenService.generateTokens(user);
      return tokens;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
