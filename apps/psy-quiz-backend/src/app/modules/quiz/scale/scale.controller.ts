import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ScaleService } from './scale.service';
import { plainToClass } from 'class-transformer';

export class ScaleRequestDto {}
export class ScaleResponseDto {}

@ApiTags('Шкала оценки')
@Controller('main')
export class ScaleController {
  constructor(private readonly service: ScaleService) {}

  @Get('scale/list')
  async getAll(): Promise<ScaleResponseDto[]> {
    const entities = await this.service.getAll(['runs']);
    return plainToClass(ScaleResponseDto, entities, { enableCircularCheck: true });
  }

  @Get('scale/:id')
  async getById(@Param('id') id: string): Promise<ScaleResponseDto> {
    const entity = await this.service.getByID(id, ['runs']);
    return plainToClass(ScaleResponseDto, entity, { enableCircularCheck: true });
  }

  @Patch('scale/:id')
  async update(
    @Body() requestDto: ScaleRequestDto,
    @Param() id: string,
  ): Promise<ScaleResponseDto> {
    const entity = await this.service.getByID(id);
    return plainToClass(ScaleResponseDto, entity, { enableCircularCheck: true });
  }

  @Delete('scale/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
