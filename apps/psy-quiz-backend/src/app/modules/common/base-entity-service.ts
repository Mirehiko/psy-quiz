import { HttpException, HttpStatus, Param } from '@nestjs/common';
import { FindOneOptions, FindOperator, In, IsNull, Not, Repository } from 'typeorm';
import { IGetParamsData } from '../../shared';
import {BaseEntity} from "./base-entity";
import {BaseService} from "./base-service";


export class BaseEntityService<T extends BaseEntity, U extends IGetParamsData> extends BaseService<T, U>{
  protected repository: Repository<T>;
	protected entityNotFoundMessage: string;

  /**
   * Restore deleted entities from trash
   * @param ids
   */
  public async restore(ids: string[]): Promise<any> {
    const entities = await this.repository
      .createQueryBuilder('entity')
      .where('entity.id IN (:...ids)', {ids})
      .withDeleted()
      .getMany();

    if (entities.length) {
      try {
        await this.repository.restore(ids);
        return {status: HttpStatus.OK, statusText: 'Recovered successfully'};
      }
      catch (e) {
        throw new Error(e);
      }
    }
    throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
  }

  /**
   * Get entities from trash
   */
  async getEntitiesTrash(): Promise<T[]> {
    return await this.repository
      .createQueryBuilder('entity')
      .where('entity.deletedAt = :deletedAt', {deletedAt: Not(IsNull())})
      .withDeleted()
      .getMany();
  }

  /**
   * Move entities to trash
   * @param ids
   */
  async moveEntitiesToTrash(ids: string[]): Promise<any> {
    const entities = await this.repository
      .createQueryBuilder('entity')
      .where('entity.id IN (:...ids)', {ids})
      .withDeleted()
      .getMany();

    if (!entities.length) {
      throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
    }

    try {
      await this.repository.softDelete(ids);
      return {status: HttpStatus.OK, statusText: 'Moved to trash successfully'};
    }
    catch (e) {
      throw new Error(e);
    }
  }
}
