import { IUserGetParamsData } from '@common/interfaces';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScaleAnswerRequestDto } from '@shared/dto';
import { Repository } from 'typeorm';
import { BaseService } from '../../common/base-service';
import { UserEntity } from '../../common/user/schemas/user.entity';
import { ScaleEntity } from '../scale/schemas/scale.entity';
import { ScaleAnswerEntity } from './schemas/scale-answer.entity';

@Injectable()
export class ScaleAnswerService extends BaseService<ScaleAnswerEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого варианта ответа';
  protected entityOrRelationNotFoundMessage: string = 'Ответ не найден';

  constructor(
    @InjectRepository(ScaleAnswerEntity)
    protected repository: Repository<ScaleAnswerEntity>,
    @InjectRepository(ScaleEntity)
    protected scaleRepository: Repository<ScaleEntity>
  ) {
    super();
  }

  async create(requestDto: ScaleAnswerRequestDto, user: UserEntity): Promise<ScaleAnswerEntity> {
    try {
      const scale = await this.scaleRepository.findOne({ where: { id: requestDto.scaleId } });
      const newEntity = await this.repository.create({ ...requestDto, scale, createdById: user.id });
      await this.repository.save(newEntity);
      return newEntity; // 201
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id: string, requestDto: ScaleAnswerRequestDto): Promise<ScaleAnswerEntity> {
    let entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
    }
    entity.answer = requestDto.answer ? requestDto.answer : entity.answer;
    entity.questionId = requestDto.questionId ? requestDto.questionId : entity.questionId;

    try {
      await this.repository.save(entity);
      return entity;
    } catch (e) {
      throw new Error(e);
    }
  }
}
