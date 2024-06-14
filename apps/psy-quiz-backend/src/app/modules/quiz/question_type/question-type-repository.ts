import { EntityRepository, Repository } from 'typeorm';
import {QuestionTypeEntity} from "./schemas/question-type.entity";


@EntityRepository(QuestionTypeEntity)
export class QuestionTypeRepository extends Repository<QuestionTypeEntity> {}
