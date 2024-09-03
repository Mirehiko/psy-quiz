import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base-entity';
import { QuestionEntity } from '../../question/schemas/question.entity';
import { ScaleEntity } from '../../scale/schemas/scale.entity';
import { TestRunEntity } from '../../test_run/schemas/test-run.entity';
import { UserEntity } from '../../../common/user/schemas/user.entity';

@Entity()
export class TestEntity extends BaseEntity {
  @ApiProperty({ example: 'Psy Test', description: 'Название теста' })
  @Column({ length: 150 })
  name: string;

  @ApiProperty({ example: 'This test...', description: 'Описание' })
  @Column({ length: 500, nullable: true, default: '' })
  description: string;

  @ApiProperty({ example: '', description: '' })
  @Column('text', { nullable: true })
  picture: string;

  @ApiProperty({ example: '', description: 'Вопросы' })
  @OneToMany(() => QuestionEntity, (question) => question.test)
  questions: QuestionEntity[];

  @ApiProperty({ example: '', description: 'Шкалы оценивания' })
  @OneToMany(() => ScaleEntity, (scale) => scale.test)
  scales: ScaleEntity[];

  @ApiProperty({ example: '', description: 'Ответы' })
  @OneToMany(() => TestRunEntity, (run) => run.test)
  runs: TestRunEntity[];

  @ManyToOne(() => UserEntity, (user) => user.tests)
  createdBy?: UserEntity;

  // @Column('text', {nullable: false})
  // createdById: string;
}
