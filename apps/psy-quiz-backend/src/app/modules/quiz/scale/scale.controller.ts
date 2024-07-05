import { Body, Controller, Delete, Get, Param, Patch, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ScaleService } from './scale.service';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { ScaleRequestDto, ScaleResponseDto } from '../dto/scale.dto';


@ApiTags('Шкала оценки')
@Controller('main')
@UseInterceptors(new TransformInterceptor())
export class ScaleController {
  constructor(private readonly service: ScaleService) {}

  @Get('scale/list')
  async getAll(): Promise<ScaleResponseDto[]> {
    const entities = await this.service.getAll();
    return plainToInstance(ScaleResponseDto, entities, { enableCircularCheck: true });
  }

  @Get('scale/:id')
  async getById(@Param('id') id: string): Promise<ScaleResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(ScaleResponseDto, entity, { enableCircularCheck: true });
  }

  @Patch('scale/:id')
  async update(@Body() requestDto: ScaleRequestDto, @Param() id: string): Promise<ScaleResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToInstance(ScaleResponseDto, entity, { enableCircularCheck: true });
  }

  @Delete('scale/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
