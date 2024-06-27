import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { ScaleAnswerService } from './scale-answer.service';

export class ScaleAnswerRequestDto {}
export class ScaleAnswerResponseDto {}

@ApiTags('Ответы по шкале оценки')
@Controller('main')
export class ScaleAnswerController {
  constructor(private readonly service: ScaleAnswerService) {}

  @Get('scale-answer/list')
  async getAll(): Promise<ScaleAnswerResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToClass(ScaleAnswerResponseDto, entities, { enableCircularCheck: true });
  }

  @Get('scale-answer/:id')
  async getById(@Param('id') id: string): Promise<ScaleAnswerResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToClass(ScaleAnswerResponseDto, entity, { enableCircularCheck: true });
  }

  @Patch('scale-answer/:id')
  async update(@Body() requestDto: ScaleAnswerRequestDto, @Param() id: string): Promise<ScaleAnswerResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToClass(ScaleAnswerResponseDto, entity, { enableCircularCheck: true });
  }

  @Delete('scale-answer/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
