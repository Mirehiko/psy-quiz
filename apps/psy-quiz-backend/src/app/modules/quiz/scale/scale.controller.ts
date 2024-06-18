import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ScaleService } from './scale.service';

@ApiTags('Шкала оценки')
@Controller('main')
export class ScaleController {
  constructor(private readonly service: ScaleService) {}
}
