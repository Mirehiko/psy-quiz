import { Controller } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import {ScaleAnswerService} from "./scale-answer.service";


@ApiTags('Ответы по шкале оценки')
@Controller('main')
export class ScaleAnswerController {
  constructor(private readonly service: ScaleAnswerService) {}
}
