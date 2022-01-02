import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './tokens.entity';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtSerivce: JwtService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async generateTokens(payload) {
    const accessToken = this.jwtSerivce.sign(payload);
    const refreshToken = this.jwtSerivce.sign(payload);
    return {
      accessToken,
      refreshToken,
    };
  }
  async findOne(token) {
    return await this.tokenRepository.findOne(token);
  }

  async saveRefreshToken(userId: number, refreshToken: string) {
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 7);

    const tokenData = await this.tokenRepository.findOne({ userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      tokenData.expires = expiresDate;

      return this.tokenRepository.save(tokenData);
    }
    const token = await this.tokenRepository.save({
      userId,
      refreshToken,
      expires: expiresDate,
    });
    return token;
  }
}
