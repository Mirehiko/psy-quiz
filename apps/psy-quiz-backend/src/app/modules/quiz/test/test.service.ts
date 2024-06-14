import {Injectable} from '@nestjs/common';
import { IUserGetParamsData } from '../../../shared';
import {BaseService} from "../../common/base-service";
import {TestEntity} from "./schemas/test.entity";
import {TestRepository} from "./test-repository";


@Injectable()
export class TestService extends BaseService<TestEntity, IUserGetParamsData> {
  protected entityNotFoundMessage: string = 'Нет такого теста';
  protected entityOrRelationNotFoundMessage: string = 'Тест не найден';

  constructor(
    protected repository: TestRepository,
  ) {
    super();
  }
}


