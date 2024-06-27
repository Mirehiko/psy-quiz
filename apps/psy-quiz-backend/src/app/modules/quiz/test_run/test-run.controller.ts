import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { TestRunService } from './test-run.service';

export class TestRunRequestDto {}
export class TestRunResponseDto {}

@ApiTags('Прохождение теста')
@Controller('main')
export class TestRunController {
  constructor(private readonly service: TestRunService) {}

  @Get('test-run/list')
  async getAll(): Promise<TestRunResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToClass(TestRunResponseDto, entities, { enableCircularCheck: true });
  }

  @Get('test-run/:id')
  async getById(@Param('id') id: string): Promise<TestRunResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToClass(TestRunResponseDto, entity, { enableCircularCheck: true });
  }

  @Patch('test-run/:id')
  async update(@Body() requestDto: TestRunRequestDto, @Param() id: string): Promise<TestRunResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToClass(TestRunResponseDto, entity, { enableCircularCheck: true });
  }

  @Delete('test-run/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
