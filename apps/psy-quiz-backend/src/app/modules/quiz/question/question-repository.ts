import { EntityRepository, Repository } from 'typeorm';
import {QuestionEntity} from "./schemas/question.entity";


@EntityRepository(QuestionEntity)
export class QuestionRepository extends Repository<QuestionEntity> {}
