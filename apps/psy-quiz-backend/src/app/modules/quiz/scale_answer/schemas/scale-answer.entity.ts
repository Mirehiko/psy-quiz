import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ScaleEntity } from '../../scale/schemas/scale.entity';

@Entity()
export class ScaleAnswerEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({ example: '', description: '' })
  @Column({ length: 150, nullable: false })
  questionId: string;

  @ApiProperty({ example: '', description: '' })
  @Column({ type: 'text', nullable: false })
  answer: string;

  @ManyToOne(() => ScaleEntity, (test) => test.answers)
  scale: ScaleEntity;
}
