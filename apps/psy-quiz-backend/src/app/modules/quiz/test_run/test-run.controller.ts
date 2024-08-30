import { Body, Controller, Delete, Get, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { TestRunService } from './test-run.service';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { TestRunRequestDto, TestRunResponseDto } from '../dto/test-run.dto';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';


@ApiTags('Прохождение теста')
@Controller('main')
@UseInterceptors(new TransformInterceptor())
export class TestRunController {
  constructor(private readonly service: TestRunService) {}

  @UseGuards(JwtAuthGuard)
  @Get('test-run/list')
  async getAll(): Promise<TestRunResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToInstance(TestRunResponseDto, entities, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Get('test-run/:id')
  async getById(@Param('id') id: string): Promise<TestRunResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(TestRunResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('test-run/:id')
  async update(@Body() requestDto: TestRunRequestDto, @Param() id: string): Promise<TestRunResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(TestRunResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('test-run/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
