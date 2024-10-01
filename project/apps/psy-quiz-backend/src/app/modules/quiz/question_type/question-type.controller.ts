import { Body, Controller, Delete, Get, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { QuestionTypeRequestDto, QuestionTypeResponseDto } from '../dto/question-type.dto';
import { QuestionTypeService } from './question-type.service';

@ApiTags('Тип вопроса')
@Controller('main')
@UseInterceptors(new TransformInterceptor())
export class QuestionTypeController {
  constructor(private readonly service: QuestionTypeService) {}

  @UseGuards(JwtAuthGuard)
  @Get('question-type/list')
  async getAll(): Promise<QuestionTypeResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToInstance(QuestionTypeResponseDto, entities, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Get('question-type/:id')
  async getById(@Param('id') id: string): Promise<QuestionTypeResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(QuestionTypeResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('question-type/:id')
  async update(@Body() requestDto: QuestionTypeRequestDto, @Param() id: string): Promise<QuestionTypeResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(QuestionTypeResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('question-type/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
