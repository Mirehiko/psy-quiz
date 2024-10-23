import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '2022.01.21', description: 'Дата создания' })
  @CreateDateColumn({ type: 'timestamptz' })
  // @CreateDateColumn({ type: 'datetime' })
  createdAt: string;

  @ApiProperty({ example: '2022.01.21', description: 'Дата обновления' })
  @UpdateDateColumn({ type: 'timestamptz' })
  // @UpdateDateColumn({ type: 'datetime' })
  updatedAt: string;

  @ApiProperty({ example: '2022.01.21', description: 'Дата удаления' })
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  // @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: string;
}
