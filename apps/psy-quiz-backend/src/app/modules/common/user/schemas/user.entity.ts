import { Exclude } from 'class-transformer';
import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from '../../base-entity';
import { Role } from "../../role/schemas/role.entity";
import { UserStatusEnum } from "../user-status.enum";
import { ConnectedUserEntity } from '../../gateway/schemas/connected-user.entity';


@Entity()
export class User extends BaseEntity {
  @ApiProperty({example: 'FirstName LastName', description: 'Имя пользователя'})
  @Column({ length: 150 })
  name: string = '';

  @ApiProperty({example: 'example@email.ru', description: 'Почтовый адрес'})
  @Column({ length: 150 })
  email: string;

  @ApiProperty({example: 'asdfs12casd;', description: 'Пароль'})
  @Exclude()
  @Column({ length: 150 })
  password: string;

  @ApiProperty({example: 'example@email.ru', description: 'Аватарка'})
  @Column('text', {nullable: true})
  avatar: string;

  @ApiProperty({ example: '', description: 'Роли'})
  @ManyToMany(() => Role, role => role.id)
  @JoinTable()
  roles: Role[];

  @ApiProperty({ example: '2022.01.21', description: 'Дата блокировки'})
  @Column({type: "timestamp", nullable: true})
  suspendedAt: Date;

  @ApiProperty({ example: 'active', description: 'Статус пользователя'})
  @Column({type: "enum", enum: Object.values(UserStatusEnum), default: UserStatusEnum.PENDING})
  status: string;

  @ApiProperty({example: 'Bad behavior', description: 'Причина блокировки'})
  @Column({type: "text", nullable: true})
  suspendReason: string;

  @ApiProperty({ example: '', description: 'Соединения пользователя'})
  @OneToMany(() => ConnectedUserEntity, connection => connection.user, {nullable: true})
  connections: ConnectedUserEntity[];
}
