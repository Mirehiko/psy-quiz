import { IUserGetParamsData } from '@common/interfaces';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RunAnswerRequestDto, TestRunRequestDto } from '@shared/dto';
import { IResult } from '@shared/interfaces';
import { Repository } from 'typeorm';
import { BaseService } from '../../common/base-service';
import { UserEntity } from '../../common/user/schemas/user.entity';
import { RunAnswerEntity } from '../run_answer/schemas/run-answer.entity';
import { TestEntity } from '../test/schemas/test.entity';
import { TestRunEntity } from './schemas/test-run.entity';

@Injectable()
export class TestRunService extends BaseService<TestRunEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого прохождения теста';
  protected entityOrRelationNotFoundMessage: string = 'Прохождение теста не найдено';

  constructor(
    @InjectRepository(TestRunEntity)
    protected repository: Repository<TestRunEntity>,
    @InjectRepository(TestEntity)
    protected testEntityRepository: Repository<TestEntity>,
    @InjectRepository(RunAnswerEntity)
    protected runAnswerRepository: Repository<RunAnswerEntity>
  ) {
    super();
  }

  async create(requestDto: TestRunRequestDto, user: UserEntity): Promise<TestRunEntity> {
    try {
      const test = await this.testEntityRepository.findOne({ where: { id: requestDto.testId }, relations: ['runs'] });
      const newEntity = await this.repository.create({ ...requestDto, test, createdById: user.id });
      await this.repository.save(newEntity);
      return newEntity; // 201
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id: string, requestDto: TestRunRequestDto): Promise<TestRunEntity> {
    let entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
    }

    entity.userId = requestDto.userId;

    try {
      await this.repository.save(entity);
      return entity;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addAnswer(runId: string, requestDto: RunAnswerRequestDto, user: UserEntity): Promise<RunAnswerEntity> {
    const run = await this.repository.findOne({ where: { id: runId }, relations: ['answers'] });
    if (!run) {
    }
    let answer = run.answers.find((answer) => answer.questionId === requestDto.questionId);
    let isCreated = false;
    if (answer) {
      answer.answer = requestDto.answer;
    } else {
      answer = await this.runAnswerRepository.create({ ...requestDto, run: run, userId: user.id });
      isCreated = true;
    }
    await this.runAnswerRepository.save(answer);

    if (isCreated) {
      if (run.answers?.length) {
        run.answers.push(answer);
      } else {
        run.answers = [answer];
      }
    }

    await this.repository.save(run);

    return answer;
  }

  async startRun(id: string, user: UserEntity): Promise<TestRunEntity> {
    let entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
    }

    if (entity.startDate !== undefined) {
      return entity; // todo: return error?
    }

    if (entity.userId !== user.id) {
      return entity;
    }

    entity.startDate = new Date();

    try {
      await this.repository.save(entity);
      return entity;
    } catch (e) {
      throw new Error(e);
    }
  }

  async finishRun(id: string, user: UserEntity): Promise<TestRunEntity> {
    let entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
    }

    // if (entity.endDate !== undefined) {
    //   return entity; // todo: return error?
    // }
    console.warn(entity);
    if (entity.userId !== user.id) {
      return entity;
    }

    entity.endDate = new Date();
    entity.isFinished = true;

    try {
      await this.repository.save(entity);
      return entity;
    } catch (e) {
      throw new Error(e);
    }
  }

  public async getResults(runId: string, user: UserEntity): Promise<IResult[]> {
    const run = await this.repository.findOne({ where: { id: runId }, relations: ['answers', 'test'] });
    let answerMap = new Map<string, string>();
    run.answers.forEach((answer: RunAnswerEntity) => {
      answerMap.set(answer.questionId, answer.answer);
    });

    const test = await this.testEntityRepository.findOne({
      where: { id: run.test.id },
      relations: ['scales', 'scales.answers', 'scales.criteria']
    });

    const results: IResult[] = [];

    test.scales.forEach((scale) => {
      const result: IResult = {
        scaleName: scale.name,
        scaleDescription: scale.description,
        score: 0
      };
      scale.answers.forEach((answer) => {
        if (answerMap.get(answer.questionId) === answer.answer) {
          result.score++;
        }
      });

      scale.criteria.forEach((criterion) => {
        if (result.score >= criterion.minScore && result.score <= criterion.maxScore) {
          result.criterion = criterion;
        }
      });
      results.push(result);
    });

    return results;
  }
}
