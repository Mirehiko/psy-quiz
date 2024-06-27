import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { CriterionService } from './criterion.service';

export class CriterionRequestDto {}
export class CriterionResponseDto {}

@ApiTags('Критерии оценки')
@Controller('main')
export class CriterionController {
  constructor(private readonly service: CriterionService) {}

  @Get('criterion/list')
  async getAll(): Promise<CriterionResponseDto[]> {
    const criteria = await this.service.getAll();
    return plainToClass(CriterionResponseDto, criteria, { enableCircularCheck: true });
  }

  @Get('criterion/:id')
  async getById(@Param('id') id: string): Promise<CriterionResponseDto> {
    const criterion = await this.service.getByID(id);
    return plainToClass(CriterionResponseDto, criterion, { enableCircularCheck: true });
  }

  @Patch('criterion/:id')
  async update(@Body() requestDto: CriterionRequestDto, @Param() id: string): Promise<CriterionResponseDto> {
    const criterion = await this.service.getByID(id);
    return plainToClass(CriterionResponseDto, criterion, { enableCircularCheck: true });
  }

  @Delete('criterion/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
