import { Body, Controller, Delete, Get, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { RunAnswerService } from './run-answer.service';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { RunAnswerRequestDto, RunAnswerResponseDto } from '../dto/run-answer.dto';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';



@ApiTags('Ответ на тест')
@Controller('main')
@UseInterceptors(new TransformInterceptor())
export class RunAnswerController {
  constructor(private readonly service: RunAnswerService) {}

  @UseGuards(JwtAuthGuard)
  @Get('run-answer/list')
  async getAll(): Promise<RunAnswerResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToInstance(RunAnswerResponseDto, entities, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Get('run-answer/:id')
  async getById(@Param('id') id: string): Promise<RunAnswerResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(RunAnswerResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('run-answer/:id')
  async update(@Body() requestDto: RunAnswerRequestDto, @Param() id: string): Promise<RunAnswerResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(RunAnswerResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('run-answer/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
