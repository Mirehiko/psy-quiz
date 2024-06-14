import { EntityRepository, Repository } from 'typeorm';
import {ScaleAnswerEntity} from "./schemas/scale-answer.entity";


@EntityRepository(ScaleAnswerEntity)
export class ScaleAnswerRepository extends Repository<ScaleAnswerEntity> {}
