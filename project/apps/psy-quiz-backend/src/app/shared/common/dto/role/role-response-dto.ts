import { Expose } from 'class-transformer';
import { PermissionResponseDto } from '../permission';

export class RoleResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  displayName: string;

  @Expose()
  description: string;

  @Expose()
  permissions: PermissionResponseDto[];
}
