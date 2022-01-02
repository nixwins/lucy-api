import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @ApiProperty({ example: '1', description: 'Уникальный идинтификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Product 1', description: 'Имя продукта' })
  @Column()
  name: string;
}
