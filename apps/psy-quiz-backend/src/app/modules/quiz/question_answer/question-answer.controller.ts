import { Body, Controller, Delete, Get, Param, Patch, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { QuestionAnswerService } from './question-answer.service';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { QuestionAnswerRequestDto, QuestionAnswerResponseDto } from '../dto/question-answer.dto';


@ApiTags('Варианты ответов')
@Controller('main')
@UseInterceptors(new TransformInterceptor())
export class QuestionAnswerController {
  constructor(private readonly service: QuestionAnswerService) {}

  @Get('question-answer/list')
  async getAll(): Promise<QuestionAnswerResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToInstance(QuestionAnswerResponseDto, entities, { enableCircularCheck: true });
  }

  @Get('question-answer/:id')
  async getById(@Param('id') id: string): Promise<QuestionAnswerResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(QuestionAnswerResponseDto, entity, { enableCircularCheck: true });
  }

  @Patch('question-answer/:id')
  async update(@Body() requestDto: QuestionAnswerRequestDto, @Param() id: string): Promise<QuestionAnswerResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(QuestionAnswerResponseDto, entity, { enableCircularCheck: true });
  }

  @Delete('question-answer/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
