import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { TestService } from './test.service';

export class TestRequestDto {}
export class TestResponseDto {}

@ApiTags('Тест')
@Controller('main')
export class TestController {
  constructor(private readonly service: TestService) {}

  @Get('test/list')
  async getAll(): Promise<TestResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToClass(TestResponseDto, entities, { enableCircularCheck: true });
  }

  @Get('test/:id')
  async getById(@Param('id') id: string): Promise<TestResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToClass(TestResponseDto, entity, { enableCircularCheck: true });
  }

  @Patch('test/:id')
  async update(@Body() requestDto: TestRequestDto, @Param() id: string): Promise<TestResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToClass(TestResponseDto, entity, { enableCircularCheck: true });
  }

  @Delete('test/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
