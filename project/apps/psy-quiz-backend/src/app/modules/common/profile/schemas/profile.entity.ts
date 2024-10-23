import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProfileEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'This test...', description: 'Описание' })
  @Column({ length: 500 })
  gender: string;

  @ApiProperty({ example: '', description: '' })
  @Column('text', { nullable: true })
  age: string;
}
