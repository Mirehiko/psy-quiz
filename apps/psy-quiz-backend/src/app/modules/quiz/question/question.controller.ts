import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { plainToClass } from 'class-transformer';

export class QuestionRequestDto {}
export class QuestionResponseDto {}

@ApiTags('Вопросы')
@Controller('main')
export class QuestionController {
  constructor(private readonly service: QuestionService) {}

  @Get('question/list')
  async getAll(): Promise<QuestionResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToClass(QuestionResponseDto, entities, { enableCircularCheck: true });
  }

  @Get('question/:id')
  async getById(@Param('id') id: string): Promise<QuestionResponseDto> {
    const entity = await this.service.getByID(id, );
    return plainToClass(QuestionResponseDto, entity, { enableCircularCheck: true });
  }

  @Patch('question/:id')
  async update(
    @Body() requestDto: QuestionRequestDto,
    @Param() id: string,
  ): Promise<QuestionResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToClass(QuestionResponseDto, entity, { enableCircularCheck: true });
  }

  @Delete('question/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
