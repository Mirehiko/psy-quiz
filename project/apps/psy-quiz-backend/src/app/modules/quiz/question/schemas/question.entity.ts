import { ApiProperty } from '@nestjs/swagger';
import { IQuestion } from '@shared/interfaces';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base-entity';
import { QuestionAnswerEntity } from '../../question_answer/schemas/question-answer.entity';
import { QuestionTypeEntity } from '../../question_type/schemas/question-type.entity';
import { TestEntity } from '../../test/schemas/test.entity';

@Entity()
export class QuestionEntity extends BaseEntity implements IQuestion {
  @ApiProperty({ example: 'Psy Test', description: 'Название теста' })
  @Column({ length: 150, nullable: true })
  name: string = '';

  @ApiProperty({ example: 'This test...', description: 'Описание' })
  @Column({ length: 500, nullable: true })
  description: string;

  @ManyToOne(() => QuestionTypeEntity, (test) => test.questions, { onDelete: 'SET NULL' })
  answerType: QuestionTypeEntity;

  @ApiProperty({ example: '', description: 'Варианты ответов' })
  @OneToMany(() => QuestionAnswerEntity, (answer) => answer.question, { onDelete: 'CASCADE' })
  answers: QuestionAnswerEntity[];

  @ApiProperty({ example: '', description: 'Поле для произвольного ответа' })
  @Column('text', { nullable: true })
  free_answer: string;

  @ManyToOne(() => TestEntity, (test) => test.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'test' })
  test: string;

  @ApiProperty({ example: '', description: '' })
  @Column('text', { nullable: false })
  createdById: string;
}
