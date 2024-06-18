import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuestionAnswerService } from './question-answer.service';

@ApiTags('Варианты ответов')
@Controller('main')
export class QuestionAnswerController {
  constructor(private readonly service: QuestionAnswerService) {}
}
