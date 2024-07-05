import { Body, Controller, Delete, Get, Param, Patch, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { TestRunService } from './test-run.service';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { TestRunRequestDto, TestRunResponseDto } from '../dto/test-run.dto';


@ApiTags('Прохождение теста')
@Controller('main')
@UseInterceptors(new TransformInterceptor())
export class TestRunController {
  constructor(private readonly service: TestRunService) {}

  @Get('test-run/list')
  async getAll(): Promise<TestRunResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToInstance(TestRunResponseDto, entities, { enableCircularCheck: true });
  }

  @Get('test-run/:id')
  async getById(@Param('id') id: string): Promise<TestRunResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(TestRunResponseDto, entity, { enableCircularCheck: true });
  }

  @Patch('test-run/:id')
  async update(@Body() requestDto: TestRunRequestDto, @Param() id: string): Promise<TestRunResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(TestRunResponseDto, entity, { enableCircularCheck: true });
  }

  @Delete('test-run/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
