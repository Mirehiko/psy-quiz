import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ScaleEntity } from '../../scale/schemas/scale.entity';
import { ICriterion } from '../../interfaces/i-criterion';

@Entity()
export class CriterionEntity implements ICriterion {
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

  @ApiProperty({ example: '', description: '' })
  @Column('text', { nullable: false })
  createdById: string;
}
