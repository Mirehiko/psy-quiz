import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IQuestionGetParamsData } from '../../../shared';
import { BaseService } from '../../common/base-service';
import { UserEntity } from '../../common/user/schemas/user.entity';
import { QuestionRequestDto } from '../dto/question.dto';
import { QuestionEntity } from './schemas/question.entity';

@Injectable()
export class QuestionService extends BaseService<QuestionEntity, IQuestionGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого вопроса';
  protected entityOrRelationNotFoundMessage: string = 'Вопрос не найден';

  constructor(
    @InjectRepository(QuestionEntity)
    protected repository: Repository<QuestionEntity>
  ) {
    super();
  }

  async create(requestDto: QuestionRequestDto, user: UserEntity): Promise<QuestionEntity> {
    try {
      const newQuestion = await this.repository.create({ ...requestDto, createdById: user.id });
      await this.repository.save(newQuestion);
      return newQuestion; // 201
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id: string, requestDto: QuestionRequestDto): Promise<QuestionEntity> {
    let question = await this.repository.findOne({ where: { id } });
    if (!question) {
      throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
    }
    question.name = requestDto.name ? requestDto.name : question.name;
    question.description = requestDto.description ? requestDto.description : question.description;
    // question.answerType = requestDto.answerType ? requestDto.answerType : question.answerType;
    question.free_answer = requestDto.free_answer ? requestDto.free_answer : question.free_answer;

    try {
      await this.repository.save(question);
      return question;
    } catch (e) {
      throw new Error(e);
    }
  }
}
