import { Entity, Column, OneToMany } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import {BaseEntity} from "../../../common/base-entity";
import {ScaleEntity} from "../../scale/schemas/scale.entity";
import {QuestionEntity} from "../../question";


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
  // @JoinTable()
  questions: QuestionEntity[];

  @ApiProperty({ example: '', description: 'Шкалы оценивания'})
  @OneToMany(() => ScaleEntity, scale => scale.test)
  // @JoinTable()
  scales: ScaleEntity[];
}
