import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ScaleEntity } from '../../scale/schemas/scale.entity';

@Entity()
export class CriterionEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({ example: '0', description: 'Минимальное значение параметра' })
  @Column('int', { nullable: false })
  minScore: number;

  @ApiProperty({ example: '0', description: 'Максимальное значение параметра' })
  @Column('int', { nullable: false })
  maxScore: number;

  @ApiProperty({ example: '', description: 'Название оценки' })
  @Column('text', { nullable: false })
  name: string;

  @ApiProperty({ example: '', description: 'Описание оценки' })
  @Column('text', { nullable: true })
  description: string;

  @ManyToOne(() => ScaleEntity, (test) => test.criteria)
  scale: ScaleEntity;
}
