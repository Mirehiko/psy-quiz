import {Entity, Column, ManyToOne, OneToMany} from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import {BaseEntity} from "../../../common/base-entity";
import {TestEntity} from "../../test";
import {QuestionTypeEntity} from "../../question_type";
import {QuestionAnswerEntity} from "../../question_answer";


@Entity()
export class QuestionEntity extends BaseEntity {
  @ApiProperty({example: 'Psy Test', description: 'Название теста'})
  @Column({ length: 150, nullable: false })
  name: string = '';

  @ApiProperty({example: 'This test...', description: 'Описание'})
  @Column({ length: 500 })
  description: string;

  @ManyToOne(() => QuestionTypeEntity, (test) => test.question)
  answerType: QuestionTypeEntity;

  @ApiProperty({ example: '', description: 'Варианты ответов'})
  @OneToMany(() => QuestionAnswerEntity, answer => answer.question)
  answers: QuestionAnswerEntity[];

  @ApiProperty({ example: '', description: 'Поле для произвольного ответа'})
  @Column('text', {nullable: true})
  free_answer: string;

  @ManyToOne(() => TestEntity, (test) => test.questions)
  test: TestEntity;
}
