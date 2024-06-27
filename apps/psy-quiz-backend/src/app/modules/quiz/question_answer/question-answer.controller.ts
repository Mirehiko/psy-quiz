import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { QuestionAnswerService } from './question-answer.service';

export class QuestionAnswerRequestDto {}
export class QuestionAnswerResponseDto {}

@ApiTags('Варианты ответов')
@Controller('main')
export class QuestionAnswerController {
  constructor(private readonly service: QuestionAnswerService) {}

  @Get('question-answer/list')
  async getAll(): Promise<QuestionAnswerResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToClass(QuestionAnswerResponseDto, entities, { enableCircularCheck: true });
  }

  @Get('question-answer/:id')
  async getById(@Param('id') id: string): Promise<QuestionAnswerResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToClass(QuestionAnswerResponseDto, entity, { enableCircularCheck: true });
  }

  @Patch('question-answer/:id')
  async update(@Body() requestDto: QuestionAnswerRequestDto, @Param() id: string): Promise<QuestionAnswerResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToClass(QuestionAnswerResponseDto, entity, { enableCircularCheck: true });
  }

  @Delete('question-answer/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
