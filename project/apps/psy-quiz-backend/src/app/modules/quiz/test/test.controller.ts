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
import { plainToInstance } from 'class-transformer';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { TestRequestDto, TestResponseDto } from '../dto/test.dto';
import { TestService } from './test.service';

@ApiTags('Test')
@Controller('main')
@UseInterceptors(new TransformInterceptor())
export class TestController {
  constructor(private readonly service: TestService) {}

  @ApiOperation({ summary: 'Возвращает список тестов' })
  @ApiResponse({
    status: 200,
    type: TestResponseDto,
    isArray: true
  })
  @ApiOperation({ summary: 'Возвращает тест по его идентификатору' })
  @ApiResponse({
    status: 200,
    type: TestResponseDto
  })
  @Get('test/:id')
  async getById(@Param('id') id: string): Promise<TestResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(TestResponseDto, entity, { enableCircularCheck: true });
  }

  // @ApiOperation({ summary: 'Модифицирует тест по его идентификатору' })
  // @ApiResponse({
  //   status: 200,
  //   type: TestResponseDto,
  // })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('test')
  async create(@Body() requestDto: TestRequestDto, @Req() request): Promise<TestResponseDto> {
    const entity = await this.service.create(requestDto, request.user);
    return plainToInstance(TestResponseDto, entity, { enableCircularCheck: true });
  }

  @ApiOperation({ summary: 'Модифицирует тест по его идентификатору' })
  @ApiResponse({
    status: 200,
    type: TestResponseDto
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('test/:id')
  async update(@Body() requestDto: TestRequestDto, @Param() id: string): Promise<TestResponseDto> {
    const entity = await this.service.update(id, requestDto);
    return plainToInstance(TestResponseDto, entity, { enableCircularCheck: true });
  }

  @ApiOperation({ summary: 'Удаляет тест по переданному идентификатору' })
  @ApiResponse({
    status: 200,
    type: TestResponseDto
  })
  @UseGuards(JwtAuthGuard)
  @Delete('test/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
