import { Body, Controller, Delete, Get, Param, Patch, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { TestService } from './test.service';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { TestRequestDto, TestResponseDto } from '../dto/test.dto';


@ApiTags('Test')
@Controller('main')
@UseInterceptors(new TransformInterceptor())
export class TestController {
  constructor(private readonly service: TestService) {}

  @Get('test/list')
  @ApiOperation({ summary: 'Возвращает список тестов' })
  @ApiResponse({
    status: 200,
    type: TestResponseDto,
    isArray: true
  })
  async getAll(): Promise<TestResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToInstance(TestResponseDto, entities, { enableCircularCheck: true });
  }

  @Get('test/:id')
  @ApiOperation({ summary: 'Возвращает тест по его идентификатору' })
  @ApiResponse({
    status: 200,
    type: TestResponseDto,
  })
  async getById(@Param('id') id: string): Promise<TestResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(TestResponseDto, entity, { enableCircularCheck: true });
  }

  @Patch('test/:id')
  @ApiOperation({ summary: 'Модифицирует тест по его идентификатору' })
  @ApiResponse({
    status: 200,
    type: TestResponseDto,
  })
  async update(@Body() requestDto: TestRequestDto, @Param() id: string): Promise<TestResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(TestResponseDto, entity, { enableCircularCheck: true });
  }

  @Delete('test/:id')
  @ApiOperation({ summary: 'Удаляет тест по переданному идентификатору' })
  @ApiResponse({
    status: 200,
    type: TestResponseDto,
  })
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
