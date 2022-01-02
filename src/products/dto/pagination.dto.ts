import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ example: '1', description: 'Текущая страница' })
  readonly page: number;
  @ApiProperty({ example: '5', description: 'Записи на каждой странице' })
  readonly perPage: number;
}
