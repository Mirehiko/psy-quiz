import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserGetParamsData } from '../../../shared';
import { BaseService } from '../../common/base-service';
import { UserEntity } from '../../common/user/schemas/user.entity';
import { QuestionRequestDto } from '../dto/question.dto';
import { QuestionAnswerEntity } from './schemas/question-answer.entity';

@Injectable()
export class QuestionAnswerService extends BaseService<QuestionAnswerEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого ответа';
  protected entityOrRelationNotFoundMessage: string = 'Ответ не найден';

  constructor(
    @InjectRepository(QuestionAnswerEntity)
    protected repository: Repository<QuestionAnswerEntity>
  ) {
    super();
  }

  async create(requestDto: QuestionRequestDto, user: UserEntity): Promise<QuestionAnswerEntity> {
    try {
      const newEntity = await this.repository.create({ ...requestDto });
      await this.repository.save(newEntity);
      return newEntity; // 201
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id: string, requestDto: QuestionRequestDto): Promise<QuestionAnswerEntity> {
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
