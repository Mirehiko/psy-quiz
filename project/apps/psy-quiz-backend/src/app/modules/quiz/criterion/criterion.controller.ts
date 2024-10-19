import { Body, Controller, Delete, Get, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CriterionRequestDto, CriterionResponseDto } from '@shared/dto';
import { plainToInstance } from 'class-transformer';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { CriterionService } from './criterion.service';

@ApiTags('Критерии оценки')
@Controller('main')
@UseInterceptors(new TransformInterceptor())
export class CriterionController {
  constructor(private readonly service: CriterionService) {}

  @UseGuards(JwtAuthGuard)
  @Get('criterion/list')
  async getAll(): Promise<CriterionResponseDto[]> {
    const criteria = await this.service.getAll();
    return plainToInstance(CriterionResponseDto, criteria, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Get('criterion/:id')
  async getById(@Param('id') id: string): Promise<CriterionResponseDto> {
    const criterion = await this.service.getByID(id);
    return plainToInstance(CriterionResponseDto, criterion, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('criterion/:id')
  async update(@Body() requestDto: CriterionRequestDto, @Param() id: string): Promise<CriterionResponseDto> {
    const criterion = await this.service.getByID(id);
    return plainToInstance(CriterionResponseDto, criterion, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('criterion/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
