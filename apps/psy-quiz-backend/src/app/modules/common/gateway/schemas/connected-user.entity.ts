import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { UserEntity } from '../../user/schemas/user.entity';


@Entity()
export class ConnectedUserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  socketId: string;

  @ManyToOne(() => UserEntity, user => user.connections)
  @JoinColumn()
  user: UserEntity;
}
