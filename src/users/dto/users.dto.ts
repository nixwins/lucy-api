import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    example: 'simple@mail.com',
    description: 'Электроная почта пользователя',
  })
  readonly email: string;
  @ApiProperty({ example: '12323qwerty', description: 'Пароль ползователя' })
  readonly password: string;
}
