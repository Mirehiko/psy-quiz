import { Body, Controller, Delete, Get, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ScaleRequestDto, ScaleResponseDto } from '@shared/dto';
import { plainToInstance } from 'class-transformer';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { ScaleService } from './scale.service';

@ApiTags('Шкала оценки')
@Controller('main')
@UseInterceptors(new TransformInterceptor())
export class ScaleController {
  constructor(private readonly service: ScaleService) {}

  @UseGuards(JwtAuthGuard)
  @Get('scale/list')
  async getAll(): Promise<ScaleResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToInstance(ScaleResponseDto, entities, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Get('scale/:id')
  async getById(@Param('id') id: string): Promise<ScaleResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(ScaleResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('scale/:id')
  async update(@Body() requestDto: ScaleRequestDto, @Param() id: string): Promise<ScaleResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(ScaleResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('scale/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
