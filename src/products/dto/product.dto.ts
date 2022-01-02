import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ example: '1', description: 'Индинтификатор продукта' })
  readonly id: number;
  @ApiProperty({ example: 'Мячь', description: 'Имя продукта' })
  readonly name: string;
}
