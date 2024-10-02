import { MigrationInterface, QueryRunner } from 'typeorm';
import { RoleEntity } from '../app/modules/common/role/schemas/role.entity';
import { UserEntity } from '../app/modules/common/user/schemas/user.entity';

export class Init1726050963725 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const roleRep = queryRunner.connection.getRepository(RoleEntity);
    const userRole = new RoleEntity();
    userRole.name = 'USER';
    userRole.description = 'Some Might';
    userRole.displayName = 'User';
    userRole.permissions = [];

    const adminRole = new RoleEntity();
    adminRole.name = 'ADMIN';
    adminRole.description = 'All Might';
    adminRole.displayName = 'Admin';
    adminRole.permissions = [];
    const createdRoles = await roleRep.save([adminRole, userRole]);

    const userRep = queryRunner.connection.getRepository(UserEntity);
    const admin = new UserEntity();
    admin.name = 'admin';
    admin.status = 'active';
    admin.email = 'mirehiko@rambler.ru';
    admin.password = '123';
    admin.roles = [createdRoles[0]];
    await userRep.save(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
