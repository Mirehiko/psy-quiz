import {PermissionEntity} from "./schemas/permission.entity";
import {RoleEntity} from "../role/schemas/role.entity";
import {getRepository, In, Repository} from "typeorm";

export class PermissionHelpers {
  public static async attachPermissionsToRoles(permissions: PermissionEntity[], roles: RoleEntity[]): Promise<true> {
    const roleRepo = getRepository(RoleEntity);
    roles.forEach(role => {
      for (const permission of permissions) {
        console.log(permission)
        const found = role.permissions.find(p => p.id === permission.id);
        if (!found) {
          role.permissions.push(permission);
        }
      }
    });

    await roleRepo.save(roles);

    return true;
  }
}
