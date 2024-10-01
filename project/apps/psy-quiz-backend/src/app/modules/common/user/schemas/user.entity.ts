import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { ScaleEntity } from '../../../quiz/scale/schemas/scale.entity';
import { ScaleAnswerEntity } from '../../../quiz/scale_answer/schemas/scale-answer.entity';
import { TestEntity } from '../../../quiz/test/schemas/test.entity';
import { BaseEntity } from '../../base-entity';
import { ConnectedUserEntity } from '../../gateway/schemas/connected-user.entity';
import { RoleEntity } from '../../role/schemas/role.entity';
import { UserStatusEnum } from '../user-status.enum';

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  roles: RoleEntity[];
  suspendedAt?: Date;
  status: string;
  suspendReason?: string;
  connections?: ConnectedUserEntity[];
  tests?: TestEntity[];
  // scaleAnswers?: ScaleAnswerEntity[];
}

@Entity()
export class UserEntity extends BaseEntity implements IUser {
  @ApiProperty({ example: 'FirstName LastName', description: 'Имя пользователя' })
  @Column({ length: 150 })
  name: string = '';

  @ApiProperty({ example: 'example@email.ru', description: 'Почтовый адрес' })
  @Column({ length: 150 })
  email: string;

  @ApiProperty({ example: 'asdfs12casd;', description: 'Пароль' })
  @Exclude()
  @Column({ length: 150 })
  password: string;

  @ApiProperty({ example: 'example@email.ru', description: 'Аватарка' })
  @Column('text', { nullable: true })
  avatar: string;

  @ApiProperty({ example: '', description: 'Роли' })
  @ManyToMany(() => RoleEntity, (role) => role.id)
  @JoinTable()
  roles: RoleEntity[];

  @ApiProperty({ example: '2022.01.21', description: 'Дата блокировки' })
  @Column({ type: 'timestamp', nullable: true })
  suspendedAt: Date;

  @ApiProperty({ example: 'active', description: 'Статус пользователя' })
  @Column({ type: 'enum', enum: Object.values(UserStatusEnum), default: UserStatusEnum.PENDING })
  status: string;

  @ApiProperty({ example: 'Bad behavior', description: 'Причина блокировки' })
  @Column({ type: 'text', nullable: true })
  suspendReason: string;

  @ApiProperty({ example: '', description: 'Соединения пользователя' })
  @OneToMany(() => ConnectedUserEntity, (connection) => connection.user, { nullable: true })
  connections: ConnectedUserEntity[];

  // @OneToMany(() => TestEntity, (test) => test.createdBy, {nullable: false})
  // tests: TestEntity[];

  // @OneToMany(() => ScaleEntity, (scale) => scale.createdBy, {nullable: false})
  // scaleAnswers: ScaleEntity[];
}
