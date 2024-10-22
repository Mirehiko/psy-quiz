import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ScaleAnswerRequestDto, ScaleAnswerResponseDto } from '@shared/dto';
import { plainToInstance } from 'class-transformer';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { ScaleAnswerService } from './scale-answer.service';

@ApiTags('Ответы по шкале оценки')
@Controller('main')
@UseInterceptors(new TransformInterceptor())
export class ScaleAnswerController {
  constructor(private readonly service: ScaleAnswerService) {}

  @UseGuards(JwtAuthGuard)
  @Get('scale-answer/list')
  async getAll(): Promise<ScaleAnswerResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToInstance(ScaleAnswerResponseDto, entities, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Get('scale-answer/:id')
  async getById(@Param('id') id: string): Promise<ScaleAnswerResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(ScaleAnswerResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('scale-answer')
  async create(@Body() requestDto: ScaleAnswerRequestDto, @Req() request): Promise<ScaleAnswerResponseDto> {
    const entity = await this.service.create(requestDto, request.user);
    return plainToInstance(ScaleAnswerResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('scale-answer/:id')
  async update(@Body() requestDto: ScaleAnswerRequestDto, @Param() id: string): Promise<ScaleAnswerResponseDto> {
    const entity = await this.service.update(id, requestDto);
    return plainToInstance(ScaleAnswerResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('scale-answer/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
