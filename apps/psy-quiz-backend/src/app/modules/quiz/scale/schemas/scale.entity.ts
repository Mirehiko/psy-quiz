import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import {TestEntity} from "../../test";
import {CriterionEntity} from "../../criterion";
import {ScaleAnswerEntity} from "../../scale_answer";


@Entity()
export class ScaleEntity {
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({example: 'Scale', description: 'Название шкалы'})
  @Column({ length: 150 })
  name: string = '';

  @ApiProperty({example: 'Шкала оценивает...', description: 'Описание шкалы'})
  @Column({ length: 500 })
  description: string;

  @ApiProperty({ example: '', description: 'Ответы попадающие в шкалу оценивания'})
  @OneToMany(() => ScaleAnswerEntity, answer => answer.scale)
  // @JoinTable()
  answers: ScaleAnswerEntity[];

  @ApiProperty({ example: '', description: 'Оценки ответов'})
  @OneToMany(() => CriterionEntity, criterion => criterion.scale)
  criteria: CriterionEntity[];

  @ManyToOne(() => TestEntity, (test) => test.scales)
  test: TestEntity;
}