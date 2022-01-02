import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Produc 1', description: 'Имя продкута' })
  readonly name: string;
}
