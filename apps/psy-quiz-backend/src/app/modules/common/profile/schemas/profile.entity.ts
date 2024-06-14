import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";


@Entity()
export class ProfileEntity {
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({example: 'This test...', description: 'Описание'})
  @Column({ length: 500 })
  gender: string;

  @ApiProperty({example: '', description: ''})
  @Column('text', {nullable: true})
  age: string;
}
