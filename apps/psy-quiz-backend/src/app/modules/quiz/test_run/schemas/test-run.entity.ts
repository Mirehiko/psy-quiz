import {Entity, Column, OneToMany, ManyToOne} from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import {BaseEntity} from "../../../common/base-entity";
import {RunAnswerEntity} from "../../run_answer/schemas/run-answer.entity";
import {TestEntity} from "../../test/schemas/test.entity";


@Entity()
export class TestRunEntity extends BaseEntity {
  @ApiProperty({example: 'Psy Test', description: 'Название теста'})
  @Column('text', {nullable: false })
  userId: string;

  @ApiProperty({ example: '', description: 'Ответы'})
  @OneToMany(() => RunAnswerEntity, answer => answer.run)
  answers: RunAnswerEntity[];

  @ManyToOne(() => TestEntity, (test) => test.runs)
  test: TestEntity;
}
