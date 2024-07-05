import { Body, Controller, Delete, Get, Param, Patch, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ScaleAnswerService } from './scale-answer.service';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { ScaleAnswerRequestDto, ScaleAnswerResponseDto } from '../dto/scale-answer.dto';


@ApiTags('Ответы по шкале оценки')
@Controller('main')
@UseInterceptors(new TransformInterceptor())
export class ScaleAnswerController {
  constructor(private readonly service: ScaleAnswerService) {}

  @Get('scale-answer/list')
  async getAll(): Promise<ScaleAnswerResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToInstance(ScaleAnswerResponseDto, entities, { enableCircularCheck: true });
  }

  @Get('scale-answer/:id')
  async getById(@Param('id') id: string): Promise<ScaleAnswerResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(ScaleAnswerResponseDto, entity, { enableCircularCheck: true });
  }

  @Patch('scale-answer/:id')
  async update(@Body() requestDto: ScaleAnswerRequestDto, @Param() id: string): Promise<ScaleAnswerResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(ScaleAnswerResponseDto, entity, { enableCircularCheck: true });
  }

  @Delete('scale-answer/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
