import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from '../../user/schemas/user.entity';


@Entity()
export class ConnectedUserEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  socketId: string;

  @ManyToOne(() => User, user => user.connections)
  @JoinColumn()
  user: User;
}
