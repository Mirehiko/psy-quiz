import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base-entity';
import { QuestionAnswerEntity } from '../../question_answer/schemas/question-answer.entity';
import { QuestionTypeEntity } from '../../question_type/schemas/question-type.entity';
import { TestEntity } from '../../test/schemas/test.entity';

@Entity()
export class QuestionEntity extends BaseEntity {
  @ApiProperty({ example: 'Psy Test', description: 'Название теста' })
  @Column({ length: 150, nullable: false })
  name: string = '';

  @ApiProperty({ example: 'This test...', description: 'Описание' })
  @Column({ length: 500, nullable: true })
  description: string;

  @ManyToOne(() => QuestionTypeEntity, (test) => test.questions)
  answerType: QuestionTypeEntity;

  @ApiProperty({ example: '', description: 'Варианты ответов' })
  @OneToMany(() => QuestionAnswerEntity, (answer) => answer.question)
  answers: QuestionAnswerEntity[];

  @ApiProperty({ example: '', description: 'Поле для произвольного ответа' })
  @Column('text', { nullable: true })
  free_answer: string;

  @ManyToOne(() => TestEntity, (test) => test.questions)
  test: TestEntity;
}
