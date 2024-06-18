import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TestRunService } from './test-run.service';

@ApiTags('Прохождение теста')
@Controller('main')
export class TestRunController {
  constructor(private readonly service: TestRunService) {}
}
