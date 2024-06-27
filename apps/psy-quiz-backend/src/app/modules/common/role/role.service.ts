import { HttpException, HttpStatus, Inject, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGetParamsData, RoleRequestDto } from '../../../shared';
import { BaseService } from '../base-service';
import { PermissionService } from '../permission/permission.service';
import { RoleEntity } from './schemas/role.entity';

@Injectable()
export class RoleService extends BaseService<RoleEntity, IGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такой роли';

  constructor(
    @InjectRepository(RoleEntity)
    protected repository: Repository<RoleEntity>,
    private permissionService: PermissionService
  ) {
    super();
  }

  /**
   * Creates new role
   * @param role
   */
  async createRole(role: RoleRequestDto): Promise<any> {
    const candidate = await this.repository.findOne({ where: { name: role.name } });
    if (candidate) {
      throw new HttpException('Такая роль уже существует. Введите другое имя роли', HttpStatus.CONFLICT);
    }
    // TODO: Replace with Permission Repository
    // TODO: Get permissions from params
    const permissions = await this.permissionService.getAll();

    try {
      const newRole = new RoleEntity();
      newRole.name = role.name;
      newRole.displayName = role.displayName;
      newRole.description = role.description;
      newRole.permissions = permissions;
      await this.repository.save(newRole);
      return newRole; // 201
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * Updates the role data
   * @param id
   * @param roleRequestDto
   */
  async updateRole(@Param() id: string, roleRequestDto: RoleRequestDto): Promise<RoleEntity> {
    const role = await this.repository.findOne({ where: { id } });
    if (!role) {
      throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
    }

    // TODO: Replace with Permission Repository
    // TODO: Get permissions from params
    const permissions = await this.permissionService.getAll();
    role.name = roleRequestDto.name;
    role.displayName = roleRequestDto.displayName;
    role.description = roleRequestDto.description;
    role.permissions = permissions;

    try {
      return await this.repository.save(role);
    } catch (e) {
      throw new Error(e);
    }
  }
}
