import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import {QuestionEntity} from "../../question/schemas/question.entity";


@Entity()
export class QuestionTypeEntity {
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({example: 'Psy Test', description: 'Название теста'})
  @Column({ length: 150, nullable: false })
  name: string = '';

  @ApiProperty({example: 'This test...', description: 'Описание'})
  @Column({ length: 500, nullable: true })
  description: string;

  @ApiProperty({ example: '', description: 'Варианты ответов'})
  @OneToMany(() => QuestionEntity, question => question.answerType)
  question: QuestionEntity[];
}
