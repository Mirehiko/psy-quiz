import { Body, Controller, Delete, Get, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { QuestionService } from './question.service';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { QuestionRequestDto, QuestionResponseDto } from '../dto/question.dto';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';

@ApiTags('Вопросы')
@Controller('main')
@UseInterceptors(new TransformInterceptor())
export class QuestionController {
  constructor(private readonly service: QuestionService) {}

  @UseGuards(JwtAuthGuard)
  @Get('question/list')
  async getAll(): Promise<QuestionResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToInstance(QuestionResponseDto, entities, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Get('question/:id')
  async getById(@Param('id') id: string): Promise<QuestionResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(QuestionResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('question/:id')
  async update(@Body() requestDto: QuestionRequestDto, @Param() id: string): Promise<QuestionResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(QuestionResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('question/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
