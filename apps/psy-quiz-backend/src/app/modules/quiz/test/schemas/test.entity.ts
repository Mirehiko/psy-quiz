import { Entity, Column, OneToMany } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import {BaseEntity} from "../../../common/base-entity";
import {QuestionEntity} from "../../question/schemas/question.entity";
import {ScaleEntity} from "../../scale/schemas/scale.entity";
import {RunAnswerEntity} from "../../run_answer/schemas/run-answer.entity";
import {TestRunEntity} from "../../test_run/schemas/test-run.entity";


@Entity()
export class TestEntity extends BaseEntity {
  @ApiProperty({example: 'Psy Test', description: 'Название теста'})
  @Column({ length: 150 })
  name: string = '';

  @ApiProperty({example: 'This test...', description: 'Описание'})
  @Column({ length: 500 })
  description: string;

  @ApiProperty({example: '', description: ''})
  @Column('text', {nullable: true})
  picture: string;

  @ApiProperty({ example: '', description: 'Вопросы'})
  @OneToMany(() => QuestionEntity, question => question.test)
  questions: QuestionEntity[];

  @ApiProperty({ example: '', description: 'Шкалы оценивания'})
  @OneToMany(() => ScaleEntity, scale => scale.test)
  scales: ScaleEntity[];

  @ApiProperty({ example: '', description: 'Ответы'})
  @OneToMany(() => TestRunEntity, run => run.test)
  runs: TestRunEntity[];
}
