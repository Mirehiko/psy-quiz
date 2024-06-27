import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { RunAnswerService } from './run-answer.service';

export class RunAnswerRequestDto {}
export class RunAnswerResponseDto {}

@ApiTags('Ответ на тест')
@Controller('main')
export class RunAnswerController {
  constructor(private readonly service: RunAnswerService) {}

  @Get('run-answer/list')
  async getAll(): Promise<RunAnswerResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToClass(RunAnswerResponseDto, entities, { enableCircularCheck: true });
  }

  @Get('run-answer/:id')
  async getById(@Param('id') id: string): Promise<RunAnswerResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToClass(RunAnswerResponseDto, entity, { enableCircularCheck: true });
  }

  @Patch('run-answer/:id')
  async update(@Body() requestDto: RunAnswerRequestDto, @Param() id: string): Promise<RunAnswerResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToClass(RunAnswerResponseDto, entity, { enableCircularCheck: true });
  }

  @Delete('run-answer/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
