import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/schemas/user.entity';
import { UserStatusEnum } from '../../user/user-status.enum';

@Entity()
export class UserToken {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'afs2342dffgsdfg234dsfg', description: 'Токен' })
  @Column({ nullable: false, unique: true })
  token: string;

  @ApiProperty({ example: 1, description: 'Id пользователя' })
  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({})
  userId: string;

  @ApiProperty({ example: '// TODO: Добавить пример', description: 'Дата окончания действия токена' })
  @Column({ nullable: false })
  expireAt: Date = new Date();
}
