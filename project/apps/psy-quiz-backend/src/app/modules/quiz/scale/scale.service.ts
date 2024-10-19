import { IUserGetParamsData } from '@common/interfaces';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScaleRequestDto } from '@shared/dto';
import { Repository } from 'typeorm';
import { BaseService } from '../../common/base-service';
import { UserEntity } from '../../common/user/schemas/user.entity';
import { ScaleEntity } from './schemas/scale.entity';

@Injectable()
export class ScaleService extends BaseService<ScaleEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такой шкалы оценки';
  protected entityOrRelationNotFoundMessage: string = 'Шкала оценки не найдена';

  constructor(
    @InjectRepository(ScaleEntity)
    protected repository: Repository<ScaleEntity>
  ) {
    super();
  }

  async create(requestDto: ScaleRequestDto, user: UserEntity): Promise<ScaleEntity> {
    try {
      const newEntity = await this.repository.create({ ...requestDto, createdById: user.id });
      await this.repository.save(newEntity);
      return newEntity; // 201
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id: string, requestDto: ScaleRequestDto): Promise<ScaleEntity> {
    let entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
    }
    entity.name = requestDto.name ? requestDto.name : entity.name;
    entity.description = requestDto.description ? requestDto.description : entity.description;

    try {
      await this.repository.save(entity);
      return entity;
    } catch (e) {
      throw new Error(e);
    }
  }
}
