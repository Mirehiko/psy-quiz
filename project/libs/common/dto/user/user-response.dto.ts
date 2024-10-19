import { Exclude, Expose } from 'class-transformer';
import { OnlineStatus } from '../../../shared';
import { RoleResponseDto } from '../role';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  avatar?: string;

  @Expose()
  roles: RoleResponseDto[];

  @Expose()
  status?: string;

  @Expose()
  createdAt?: string;

  @Expose()
  updatedAt?: string;

  @Expose()
  suspendedAt?: Date = undefined;

  @Expose()
  onlineStatus?: OnlineStatus;

  @Expose()
  suspendReason?: string = '';

  @Exclude()
  password?: string;
}
