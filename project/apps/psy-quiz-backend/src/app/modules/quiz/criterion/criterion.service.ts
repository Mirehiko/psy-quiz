import { IUserGetParamsData } from '@common/interfaces';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CriterionRequestDto } from '@shared/dto';
import { Repository } from 'typeorm';
import { BaseService } from '../../common/base-service';
import { UserEntity } from '../../common/user/schemas/user.entity';
import { ScaleEntity } from '../scale/schemas/scale.entity';
import { CriterionEntity } from './schemas/criterion.entity';

@Injectable()
export class CriterionService extends BaseService<CriterionEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого критерия';
  protected entityOrRelationNotFoundMessage: string = 'Критерий не найден';

  constructor(
    @InjectRepository(CriterionEntity)
    protected repository: Repository<CriterionEntity>,
    @InjectRepository(ScaleEntity)
    protected scaleRepository: Repository<ScaleEntity>
  ) {
    super();
  }

  async create(requestDto: CriterionRequestDto, user: UserEntity): Promise<CriterionEntity> {
    try {
      const scale = await this.scaleRepository.findOne({ where: { id: requestDto.scaleId } });
      const newEntity = await this.repository.create({ ...requestDto, scale, createdById: user.id });
      await this.repository.save(newEntity);
      return newEntity; // 201
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id: string, requestDto: CriterionRequestDto): Promise<CriterionEntity> {
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
