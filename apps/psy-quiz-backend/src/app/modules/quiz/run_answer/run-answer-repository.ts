import { EntityRepository, Repository } from 'typeorm';
import {RunAnswerEntity} from "./schemas/run-answer.entity";


@EntityRepository(RunAnswerEntity)
export class RunAnswerRepository extends Repository<RunAnswerEntity> {}
