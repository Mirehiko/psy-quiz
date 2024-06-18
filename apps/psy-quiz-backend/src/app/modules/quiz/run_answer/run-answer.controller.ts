import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RunAnswerService } from './run-answer.service';

@ApiTags('Ответ на тест')
@Controller('main')
export class RunAnswerController {
  constructor(private readonly service: RunAnswerService) {}
}
