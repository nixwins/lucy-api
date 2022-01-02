import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './tokens.entity';
import { TokenService } from './tokens.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET_KEY,
      }),
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokensModule {}
