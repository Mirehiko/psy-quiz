import { Body, Controller, Delete, Get, Param, Patch, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { QuestionService } from './question.service';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { QuestionRequestDto, QuestionResponseDto } from '../dto/question.dto';

@ApiTags('Вопросы')
@Controller('main')
@UseInterceptors(new TransformInterceptor())
export class QuestionController {
  constructor(private readonly service: QuestionService) {}

  @Get('question/list')
  async getAll(): Promise<QuestionResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToInstance(QuestionResponseDto, entities, { enableCircularCheck: true });
  }

  @Get('question/:id')
  async getById(@Param('id') id: string): Promise<QuestionResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(QuestionResponseDto, entity, { enableCircularCheck: true });
  }

  @Patch('question/:id')
  async update(@Body() requestDto: QuestionRequestDto, @Param() id: string): Promise<QuestionResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(QuestionResponseDto, entity, { enableCircularCheck: true });
  }

  @Delete('question/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
