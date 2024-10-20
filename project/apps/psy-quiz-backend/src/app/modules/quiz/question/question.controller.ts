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
  UseInterceptors,
  UsePipes
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  QuestionAnswerRequestDto,
  QuestionAnswerResponseDto,
  QuestionRequestDto,
  QuestionResponseDto
} from '@shared/dto';
import { plainToInstance } from 'class-transformer';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { QuestionService } from './question.service';

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
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('question')
  async create(@Body() requestDto: QuestionRequestDto, @Req() request): Promise<QuestionResponseDto> {
    const entity = await this.service.create(request, request.user);
    return plainToInstance(QuestionResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  // @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('question/:id')
  async update(@Param('id') id: string, @Body() requestDto: QuestionRequestDto): Promise<QuestionResponseDto> {
    const entity = await this.service.update(id, requestDto);
    return plainToInstance(QuestionResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('question/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('question/:id/answer')
  async addAnswer(
    @Param('id') id: string,
    @Body() requestDto: QuestionAnswerRequestDto,
    @Req() request
  ): Promise<QuestionAnswerResponseDto> {
    console.warn(requestDto);
    const entity = await this.service.addAnswer(id, requestDto, request.user);
    return plainToInstance(QuestionAnswerResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('question/:id/answer/:answerId')
  async updateAnswer(
    @Param('id') id: string,
    @Param('answerId') answerId: string,
    @Body() requestDto: QuestionAnswerRequestDto,
    @Req() request
  ): Promise<QuestionAnswerResponseDto> {
    const entity = await this.service.updateAnswer(id, answerId, requestDto, request.user);
    return plainToInstance(QuestionAnswerResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('question/:id/answer/:answerId')
  async removeAnswer(@Param('id') id: string, @Param('answerId') answerId: string): Promise<any> {
    return await this.service.removeAnswer(id, answerId);
    // return plainToInstance(QuestionResponseDto, entity, { enableCircularCheck: true });
  }

  @ApiOperation({ summary: 'Возвращает варианты ответов на вопрос' })
  @ApiResponse({
    status: 200,
    type: QuestionAnswerResponseDto
  })
  @Get('question/:id/answers')
  async getAnswers(@Param('id') id: string): Promise<QuestionAnswerResponseDto[]> {
    const question = await this.service.getBy({ params: { id }, withRelations: true }, ['answers']);
    return plainToInstance(QuestionAnswerResponseDto, question.answers, { enableCircularCheck: true });
  }
}
