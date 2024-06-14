import { Controller } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import {QuestionTypeService} from "./question-type.service";


@ApiTags('Тип вопроса')
@Controller('main')
export class QuestionTypeController {
  constructor(private readonly service: QuestionTypeService) {}
}
