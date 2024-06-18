import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import {QuestionEntity} from "../../question/schemas/question.entity";


@Entity()
export class QuestionAnswerEntity {
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({example: 'Psy Test', description: 'Наименование ответа'})
  @Column({ length: 150 })
  name: string = '';

  @ApiProperty({example: 'This test...', description: 'Описание ответа'})
  @Column({ length: 500 })
  description: string;

  @ManyToOne(() => QuestionEntity, (question) => question.answers)
  question: QuestionEntity;
}
