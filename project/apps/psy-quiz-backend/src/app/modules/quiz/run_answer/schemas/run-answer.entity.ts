import { ApiProperty } from '@nestjs/swagger';
import { IRunAnswer } from '@shared/interfaces';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TestRunEntity } from '../../test_run/schemas/test-run.entity';

@Entity()
export class RunAnswerEntity implements IRunAnswer {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Psy Test', description: 'Название теста' })
  @Column({ length: 150, nullable: false })
  questionId: string;

  @ApiProperty({ example: 'This test...', description: 'Описание' })
  @Column({ length: 500, nullable: false })
  answer: string;

  @ManyToOne(() => TestRunEntity, (run) => run.answers)
  run: TestRunEntity;

  @ApiProperty({ example: '', description: '' })
  @Column('text', { nullable: false })
  userId: string;
}
