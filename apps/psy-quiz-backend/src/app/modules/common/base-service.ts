import { HttpException, HttpStatus, Param } from '@nestjs/common';
import { FindOneOptions, FindOperator, In, IsNull, Not, Repository } from 'typeorm';
import { IGetParamsData } from '../../shared';
import { RequestObjectWithId } from '../../shared/common/dto/objectWithId';


export class BaseService<T extends RequestObjectWithId, U extends IGetParamsData> {
  protected repository: Repository<T>;
	protected entityNotFoundMessage: string;

  /**
   * Get list of entities
   * @param relations
   */
  public async getAll(relations: string[] = []): Promise<T[]> {
    return await this.repository.find({relations});
  }

  /**
   * Get entity by Id
   * @param id
   * @param relations
   */
	public async getByID(id: string, relations: string[] = []): Promise<T> {
		const entity = await this.repository.findOne({where: {id}, relations});
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
			const requestObject: FindOneOptions<T> = {
        where: {...paramsData.params}
			};

      requestObject.relations = relations;

			const entity = await this.repository.findOne(requestObject);
			if (entity) {
				return entity;
			}

			// if (paramsData.checkOnly) {
			// 	return;
			// }

			throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
		}
		catch (e) {
			throw new Error(e);
		}
	}

  /**
   * @param ids
   */
	public async delete(ids: string[]): Promise<any> {
    const entities = await this.repository.find({where: {id: In(ids)}, withDeleted: true});
    if (entities.length) {
      try {
        await this.repository.remove(entities);
        return {status: HttpStatus.OK, statusText: 'Deleted successfully'};
      }
      catch (e) {
        throw new Error(e);
      }
    }
    throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
	}

  /**
   * Restore deleted entities from trash
   * @param ids
    */
  public async restore(ids: string[]): Promise<any> {
    const entities = await this.repository.find({where: {id: In(ids)}, withDeleted: true});
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
    return await this.repository.find({withDeleted: true, where: {deletedAt: Not(IsNull())}});
  }

  /**
   * Move entities to trash
   * @param ids
   */
  async moveEntitiesToTrash(ids: string[]): Promise<any> {
    const entities = await this.repository.find({where: {id: In([...ids])}});
    // const entities = await this.repository
    //   .createQueryBuilder()
    //   .where(':id = ANY (entities_ids)', {id:})
    //   .getMany();
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
