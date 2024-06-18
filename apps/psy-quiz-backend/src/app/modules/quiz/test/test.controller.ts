import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TestService } from './test.service';
import { plainToClass } from 'class-transformer';

export class TestRequestDto {}
export class TestResponseDto {}

@ApiTags('Тест')
@Controller('main')
export class TestController {
  constructor(private readonly service: TestService) {}

  @Get('test/list')
  async getAll(): Promise<TestResponseDto[]> {
    const tests = await this.service.getAll(['runs']);
    return plainToClass(TestResponseDto, tests, { enableCircularCheck: true });
  }

  @Get('test/:id')
  async getById(@Param('id') id: string): Promise<TestResponseDto> {
    const test = await this.service.getByID(id, ['runs']);
    return plainToClass(TestResponseDto, test, { enableCircularCheck: true });
  }

  @Patch('test/:id')
  async update(
    @Body() requestDto: TestRequestDto,
    @Param() id: string,
  ): Promise<TestResponseDto> {
    const test = await this.service.getByID(id);
    return plainToClass(TestResponseDto, test, { enableCircularCheck: true });
  }

  @Delete('test/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
