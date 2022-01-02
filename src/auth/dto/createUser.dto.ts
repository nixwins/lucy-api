import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'simple@mail.com',
    description: 'Email пользователя',
  })
  readonly email: string;
  @ApiProperty({
    example: '123кккк',
    description: 'Пароль пользователя',
  })
  readonly password: string;
  @ApiProperty({
    example: '123кккк',
    description: 'Пароль пользователя',
  })
  readonly passwordConfirm: string;
}
