import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTY0MTE0NzkxNn0.kkruB9dGUAk4PuZFe9_han1OxyYW0cCpnsUnHzjrWc4',
    description: 'Токен авторизации',
  })
  readonly accessToken: string;
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTY0MTE0NzkxNn0.kkruB9dGUAk4PuZFe9_han1OxyYW0cCpnsUnHzjrWc4',
    description: 'Токен для обновления accessToken',
  })
  readonly refreshToken: string;
}
