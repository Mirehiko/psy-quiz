import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CriterionService } from './criterion.service';

@ApiTags('Критерии оценки')
@Controller('main')
export class CriterionController {
  constructor(private readonly service: CriterionService) {}
}
