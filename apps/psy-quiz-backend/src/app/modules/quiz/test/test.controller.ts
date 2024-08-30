import { Body, Controller, Delete, Get, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { TestService } from './test.service';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { TestRequestDto, TestResponseDto } from '../dto/test.dto';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';


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
  @UseGuards(JwtAuthGuard)
  @Get('test/list')
  async getAll(): Promise<TestResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToInstance(TestResponseDto, entities, { enableCircularCheck: true });
  }

  @ApiOperation({ summary: 'Возвращает тест по его идентификатору' })
  @ApiResponse({
    status: 200,
    type: TestResponseDto,
  })
  @UseGuards(JwtAuthGuard)
  @Get('test/:id')
  async getById(@Param('id') id: string): Promise<TestResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(TestResponseDto, entity, { enableCircularCheck: true });
  }

  @ApiOperation({ summary: 'Модифицирует тест по его идентификатору' })
  @ApiResponse({
    status: 200,
    type: TestResponseDto,
  })
  @UseGuards(JwtAuthGuard)
  @Patch('test/:id')
  async update(@Body() requestDto: TestRequestDto, @Param() id: string): Promise<TestResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(TestResponseDto, entity, { enableCircularCheck: true });
  }

  @ApiOperation({ summary: 'Удаляет тест по переданному идентификатору' })
  @ApiResponse({
    status: 200,
    type: TestResponseDto,
  })
  @UseGuards(JwtAuthGuard)
  @Delete('test/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
