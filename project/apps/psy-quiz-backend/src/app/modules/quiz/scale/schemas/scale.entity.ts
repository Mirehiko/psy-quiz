import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../../common/user/schemas/user.entity';
import { CriterionEntity } from '../../criterion/schemas/criterion.entity';
import { IScale } from '../../dto/scale.dto';
import { ScaleAnswerEntity } from '../../scale_answer/schemas/scale-answer.entity';
import { TestEntity } from '../../test/schemas/test.entity';

@Entity()
export class ScaleEntity implements IScale {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({ example: 'Scale', description: 'Название шкалы' })
  @Column({ length: 150 })
  name: string = '';

  @ApiProperty({ example: 'Шкала оценивает...', description: 'Описание шкалы' })
  @Column({ length: 500 })
  description: string;

  @ApiProperty({ example: '', description: 'Ответы попадающие в шкалу оценивания' })
  @OneToMany(() => ScaleAnswerEntity, (answer) => answer.scale)
  answers: ScaleAnswerEntity[];

  @ApiProperty({ example: '', description: 'Оценки ответов' })
  @OneToMany(() => CriterionEntity, (criterion) => criterion.scale)
  criteria: CriterionEntity[];

  @ManyToOne(() => TestEntity, (test) => test.scales)
  test: TestEntity;

  @ApiProperty({ example: '', description: '' })
  @Column('text', { nullable: false })
  createdById: string;
}
