import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuestionTypeService } from './question-type.service';
import { plainToClass } from 'class-transformer';

export class QuestionTypeRequestDto {}
export class QuestionTypeResponseDto {}

@ApiTags('Тип вопроса')
@Controller('main')
export class QuestionTypeController {
  constructor(private readonly service: QuestionTypeService) {}

  @Get('question-type/list')
  async getAll(): Promise<QuestionTypeResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToClass(QuestionTypeResponseDto, entities, { enableCircularCheck: true });
  }

  @Get('question-type/:id')
  async getById(@Param('id') id: string): Promise<QuestionTypeResponseDto> {
    const entity = await this.service.getByID(id, );
    return plainToClass(QuestionTypeResponseDto, entity, { enableCircularCheck: true });
  }

  @Patch('question-type/:id')
  async update(
    @Body() requestDto: QuestionTypeRequestDto,
    @Param() id: string,
  ): Promise<QuestionTypeResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToClass(QuestionTypeResponseDto, entity, { enableCircularCheck: true });
  }

  @Delete('question-type/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
