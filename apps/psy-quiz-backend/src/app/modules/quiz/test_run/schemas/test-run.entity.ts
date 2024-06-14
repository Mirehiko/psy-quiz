import { Entity, Column, OneToMany } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import {BaseEntity} from "../../../common/base-entity";
import {RunAnswerEntity} from "../../run_answer";


@Entity()
export class TestRunEntity extends BaseEntity {
  @ApiProperty({example: 'Psy Test', description: 'Название теста'})
  @Column('text', {nullable: false })
  userId: string;

  @ApiProperty({example: 'Psy Test', description: 'Название теста'})
  @Column('text', {nullable: false })
  testId: string;

  @ApiProperty({ example: '', description: 'Ответы'})
  @OneToMany(() => RunAnswerEntity, answer => answer.run)
  // @JoinTable()
  answers: RunAnswerEntity[];
}
