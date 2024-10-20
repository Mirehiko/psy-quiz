import { IQuestionGetParamsData } from '@common/interfaces';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionAnswerRequestDto, QuestionRequestDto } from '@shared/dto';
import { Repository } from 'typeorm';
import { BaseService } from '../../common/base-service';
import { UserEntity } from '../../common/user/schemas/user.entity';
import { QuestionAnswerEntity } from '../question_answer/schemas/question-answer.entity';
import { QuestionEntity } from './schemas/question.entity';

@Injectable()
export class QuestionService extends BaseService<QuestionEntity, IQuestionGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого вопроса';
  protected entityOrRelationNotFoundMessage: string = 'Вопрос не найден';

  constructor(
    @InjectRepository(QuestionEntity)
    protected repository: Repository<QuestionEntity>,
    @InjectRepository(QuestionAnswerEntity)
    protected answerRepository: Repository<QuestionAnswerEntity>
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
    question.answerType = requestDto.answerType ? requestDto.answerType : question.answerType;
    question.free_answer = requestDto.free_answer ? requestDto.free_answer : question.free_answer;

    try {
      await this.repository.save(question);
      return question;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addAnswer(
    questionId: string,
    requestDto: QuestionAnswerRequestDto,
    user: UserEntity
  ): Promise<QuestionAnswerEntity> {
    const question = await this.repository.findOne({ where: { id: questionId }, relations: ['answers'] });
    const answer = await this.answerRepository.create({ ...requestDto, question: question, createdById: user.id });
    await this.answerRepository.save(answer);
    if (question.answers?.length) {
      question.answers.push(answer);
    } else {
      question.answers = [answer];
    }
    await this.repository.save(question);

    return answer;
  }

  async updateAnswer(
    questionId: string,
    answerId: string,
    requestDto: QuestionAnswerRequestDto,
    user: UserEntity
  ): Promise<QuestionAnswerEntity> {
    const answer = await this.answerRepository.findOne({ where: { id: answerId } });
    answer.name = requestDto.name ? requestDto.name : answer.name;
    answer.description = requestDto.description ? requestDto.description : answer.description;
    await this.answerRepository.save(answer);

    return answer;
  }

  async removeAnswer(questionId: string, answerId: string): Promise<any> {
    const question = await this.repository.findOne({ where: { id: questionId }, relations: ['answers'] });
    question.answers = question.answers.filter((answer) => answer.id === answerId);
    await this.repository.save(question);
  }
}
