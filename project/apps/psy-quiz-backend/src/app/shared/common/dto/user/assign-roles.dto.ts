import { RoleRequestDto } from '../role/role-request-dto';

export class UserRolesDto {
  readonly userId: string;
  readonly roles: RoleRequestDto[];
  readonly replaceRoles?: boolean;
}
