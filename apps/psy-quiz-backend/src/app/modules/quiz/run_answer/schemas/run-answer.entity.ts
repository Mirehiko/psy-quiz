import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import {TestRunEntity} from "../../test_run/schemas/test-run.entity";


@Entity()
export class RunAnswerEntity {
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({example: 'Psy Test', description: 'Название теста'})
  @Column({ length: 150, nullable: false })
  questionId: string;

  @ApiProperty({example: 'This test...', description: 'Описание'})
  @Column({ length: 500, nullable: false })
  answer: string;

  @ManyToOne(() => TestRunEntity, (run) => run.answers)
  run: TestRunEntity;
}
