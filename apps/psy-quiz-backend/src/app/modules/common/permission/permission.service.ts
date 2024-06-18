import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { IGetParamsData, PermissionRequestDto } from '../../../shared';
import { BaseService } from '../base-service';
import { PermissionRepository } from './permission-repository';
import { PermissionEntity } from './schemas/permission.entity';

@Injectable()
export class PermissionService extends BaseService<PermissionEntity, IGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого пермишена';

  constructor(protected repository: PermissionRepository) {
    super();
  }

  /**
   * Creates the new permission
   * @param permission
   */
  async createPermission(permission: PermissionRequestDto): Promise<PermissionEntity> {
    const candidate = await this.repository.findOne({ where: { name: permission.name } });
    if (candidate) {
      throw new HttpException('Такой пермишен уже существует. Введите другое имя пермишена', HttpStatus.CONFLICT);
    }

    try {
      const newPermission = await this.repository.create({ ...permission });
      await this.repository.save(newPermission);
      return newPermission; // 201
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * Update the permission data
   * @param id
   * @param permissionRequestDto
   */
  async updatePermission(@Param() id: string, permissionRequestDto: PermissionRequestDto): Promise<PermissionEntity> {
    const permission = await this.repository.findOne({ where: { id } });
    if (!permission) {
      throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
    }

    permission.name = permissionRequestDto.name;
    permission.displayName = permissionRequestDto.displayName;
    permission.description = permissionRequestDto.description;

    try {
      return await this.repository.save(permission);
    } catch (e) {
      throw new Error(e);
    }
  }
}
