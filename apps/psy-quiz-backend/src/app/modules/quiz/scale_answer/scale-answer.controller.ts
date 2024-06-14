import { Controller } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import {ScaleService} from "../scale";


@ApiTags('Ответы по шкале оценки')
@Controller('main')
export class ScaleAnswerController {
  constructor(private readonly service: ScaleService) {}
}
