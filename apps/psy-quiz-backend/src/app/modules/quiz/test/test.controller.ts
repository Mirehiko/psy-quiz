import {Controller, Get} from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import {TestService} from "./test.service";
import { Expose, plainToClass} from "class-transformer";

export class TestResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}

@ApiTags('Тест')
@Controller('main')
export class TestController {
  constructor(private readonly service: TestService) {}

  @Get('test/list')
  async list(): Promise<TestResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToClass(TestResponseDto, entities, { enableCircularCheck: true });
  }
}
