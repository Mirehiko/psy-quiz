import { IUserGetParamsData } from '@common/interfaces';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionRequestDto, TestRequestDto } from '@shared/dto';
import { IResult } from '@shared/interfaces';
import { Repository } from 'typeorm';
import { BaseService } from '../../common/base-service';
import { UserEntity } from '../../common/user/schemas/user.entity';
import { QuestionEntity } from '../question/schemas/question.entity';
import { RunAnswerEntity } from '../run_answer/schemas/run-answer.entity';
import { ScaleEntity } from '../scale/schemas/scale.entity';
import { TestRunEntity } from '../test_run/schemas/test-run.entity';
import { TestEntity } from './schemas/test.entity';

@Injectable()
export class TestService extends BaseService<TestEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого теста';
  protected entityOrRelationNotFoundMessage: string = 'Тест не найден';

  constructor(
    @InjectRepository(TestEntity)
    protected repository: Repository<TestEntity>,
    @InjectRepository(QuestionEntity)
    protected questionRepo: Repository<QuestionEntity>,
    @InjectRepository(TestRunEntity)
    protected runRepo: Repository<TestRunEntity>,
    @InjectRepository(ScaleEntity)
    protected scaleRepo: Repository<ScaleEntity>
  ) {
    super();
  }

  async create(requestDto: TestRequestDto, user: UserEntity): Promise<TestEntity> {
    try {
      const newEntity = await this.repository.create({ ...requestDto, createdById: user.id });
      await this.repository.save(newEntity);
      return newEntity; // 201
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id: string, requestDto: TestRequestDto): Promise<TestEntity> {
    let entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
    }
    entity.name = requestDto.name ? requestDto.name : entity.name;
    entity.description = requestDto.description ? requestDto.description : entity.description;

    try {
      await this.repository.update(id, entity);
      return entity;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addQuestion(testId: string, requestDto: QuestionRequestDto, user: UserEntity): Promise<QuestionEntity> {
    const test = await this.repository.findOne({ where: { id: testId }, relations: ['questions'] });
    const question = await this.questionRepo.create({ ...requestDto, test: testId, createdById: user.id });
    await this.questionRepo.save(question);
    if (test.questions?.length) {
      test.questions.push(question);
    } else {
      test.questions = [question];
    }
    await this.repository.save(test);

    return question;
  }

  async getActiveRun(testId: string, user: UserEntity): Promise<TestRunEntity | undefined> {
    const test = await this.repository.findOne({ where: { id: testId }, relations: ['runs'] });
    return test.runs.find((run) => run.userId === user.id.toString() && run.isFinished === false);
  }

  public async getScales(testId: string, user: UserEntity): Promise<ScaleEntity[]> {
    const test = await this.repository.findOne({
      where: { id: testId },
      relations: ['scales', 'scales.answers', 'scales.criteria']
    });
    return test.scales;
  }
}
