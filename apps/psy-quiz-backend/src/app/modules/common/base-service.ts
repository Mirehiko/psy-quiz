import { HttpException, HttpStatus, Param } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { IGetParamsData } from '../../shared';
import { RequestObjectWithId } from '../../shared/common/dto/objectWithId';

export abstract class BaseService<T extends RequestObjectWithId, U extends IGetParamsData> {
  protected repository: Repository<T>;
  protected entityNotFoundMessage: string;

  /**
   * Get list of entities
   * @param relations
   */
  public async getAll(relations: string[] = []): Promise<T[]> {
    return await this.repository.find({ relations });
  }

  /**
   * Get entity by Id
   * @param id
   * @param relations
   */
  public async getByID(id: string, relations: string[] = []): Promise<T> {
    const requestObject: FindOneOptions<any> = {
      where: { id }
    };
    requestObject.relations = relations;

    const entity = await this.repository.findOne(requestObject);
    if (entity) {
      return entity;
    }
    throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
  }

  /**
   * Get entity by
   * @param paramsData
   * @param relations
   */
  public async getBy(@Param() paramsData: U, relations: string[] = []): Promise<T> {
    try {
      const requestObject: FindOneOptions<any> = {
        where: { ...paramsData.params }
      };

      requestObject.relations = relations;

      const entity = await this.repository.findOne(requestObject);
      if (entity) {
        return entity;
      }

      if (paramsData.checkOnly) {
      	return;
      }

      throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * @param ids
   */
  public async delete(ids: string[]): Promise<any> {
    const entities = await this.repository
      .createQueryBuilder('entity')
      .where('entity.id IN (:...ids)', { ids })
      .withDeleted()
      .getMany();

    if (entities.length) {
      try {
        await this.repository.remove(entities);
        return { status: HttpStatus.OK, statusText: 'Deleted successfully' };
      } catch (e) {
        throw new Error(e);
      }
    }
    throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
  }
}
