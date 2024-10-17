import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionEntity } from '../../question/schemas/question.entity';

@Entity()
export class QuestionAnswerEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({ example: 'Psy Test', description: 'Наименование ответа' })
  @Column({ length: 150 })
  name: string = '';

  @ApiProperty({ example: 'This test...', description: 'Описание ответа' })
  @Column({ length: 500 })
  description: string;

  @ManyToOne(() => QuestionEntity, (question) => question.answers)
  @JoinColumn()
  question: QuestionEntity;

  @ApiProperty({ example: '', description: '' })
  @Column('text', { nullable: false })
  createdById: string;
}
