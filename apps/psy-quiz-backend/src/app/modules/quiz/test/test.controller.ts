import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TestService } from './test.service';

@ApiTags('Тест')
@Controller('main')
export class TestController {
  constructor(private readonly service: TestService) {}
}
