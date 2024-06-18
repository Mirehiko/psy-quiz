import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuestionService } from './question.service';

@ApiTags('Вопросы')
@Controller('main')
export class QuestionController {
  constructor(private readonly service: QuestionService) {}
}
