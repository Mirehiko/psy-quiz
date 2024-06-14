import { EntityRepository, Repository } from 'typeorm';
import {TestRunEntity} from "./schemas/test-run.entity";


@EntityRepository(TestRunEntity)
export class TestRunRepository extends Repository<TestRunEntity> {}
