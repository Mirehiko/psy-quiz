import { ApiProperty } from '@nestjs/swagger';
import { ITestRun } from '@shared/interfaces';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base-entity';
import { RunAnswerEntity } from '../../run_answer/schemas/run-answer.entity';
import { TestEntity } from '../../test/schemas/test.entity';

@Entity()
export class TestRunEntity extends BaseEntity implements ITestRun {
  @ApiProperty({ example: 'adlsfj09asfl', description: 'id пользователя, проходящего тест' })
  @Column('text', { nullable: false })
  userId: string;

  @ApiProperty({ example: '', description: 'Ответы' })
  @OneToMany(() => RunAnswerEntity, (answer) => answer.run)
  answers: RunAnswerEntity[];

  @ManyToOne(() => TestEntity, (test) => test.runs)
  test: TestEntity;

  @ApiProperty({ example: '', description: '' })
  @Column('text', { nullable: false })
  createdById: string;

  @ApiProperty({ example: '2022.01.21', description: 'Дата начала прохождения теста' })
  @CreateDateColumn({ type: 'timestamptz' })
  // @CreateDateColumn({ type: 'datetime' })
  startDate: Date;

  @ApiProperty({ example: '2022.01.21', description: 'Дата окончания прохождения теста' })
  @CreateDateColumn({ type: 'timestamptz' })
  // @CreateDateColumn({ type: 'datetime' })
  endDate: Date;
}
