import { RoleRequestDto } from '../role';

export class UserRolesDto {
  readonly userId: string;
  readonly roles: RoleRequestDto[];
  readonly replaceRoles?: boolean;
}
