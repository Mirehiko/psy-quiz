import { EntityRepository, Repository } from 'typeorm';
import {QuestionAnswerEntity} from "./schemas/question-answer.entity";


@EntityRepository(QuestionAnswerEntity)
export class QuestionAnswerRepository extends Repository<QuestionAnswerEntity> {}
