import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { IGetParamsData, RoleRequestDto, RoleResponseDto } from '../../../shared';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { RoleService } from './role.service';
import { RoleEntity } from './schemas/role.entity';

// TODO: Add auth guard after migrations release
@ApiTags('Роли')
@Controller('main')
@UseInterceptors(new TransformInterceptor())
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @ApiOperation({ summary: 'Получение списка ролей' })
  // @ApiResponse({status: 200, type: [Role]})
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('roles')
  async getRoles(): Promise<RoleResponseDto[]> {
    const roles = await this.service.getAll(['permissions']);
    return plainToInstance(RoleResponseDto, roles, { enableCircularCheck: true });
  }

  @ApiOperation({ summary: 'Получение роли' })
  @ApiResponse({ status: 200, type: RoleEntity })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('role/:id')
  async getRoleById(@Param('id') id: string): Promise<RoleResponseDto> {
    const role = await this.service.getByID(id, ['permissions']);
    return plainToInstance(RoleResponseDto, role, { enableCircularCheck: true });
  }

  @ApiOperation({ summary: 'Получение роли' })
  @ApiResponse({ status: 200, type: RoleEntity })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('role/:id')
  async getRoleBy(@Query() requestParams: IGetParamsData): Promise<RoleResponseDto> {
    const role = await this.service.getBy(requestParams, ['permissions']);
    return plainToInstance(RoleResponseDto, role, { enableCircularCheck: true });
  }

  @ApiOperation({ summary: 'Обновление роли' })
  @ApiResponse({ status: 200, type: RoleEntity })
  @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('ADMIN')
  @Patch('role/:id')
  async updateRole(@Param('id') id: string, @Body() roleRequestDto: RoleRequestDto): Promise<RoleResponseDto> {
    const role = await this.service.updateRole(id, roleRequestDto);
    return plainToInstance(RoleResponseDto, role, { enableCircularCheck: true });
  }

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 201, type: RoleEntity })
  // @Roles('ADMIN')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('role')
  async createRole(@Body() roleRequestDto: RoleRequestDto): Promise<any> {
    const role = await this.service.createRole(roleRequestDto);
    return plainToInstance(RoleResponseDto, role, { enableCircularCheck: true });
  }

  @ApiOperation({ summary: 'Удаление роли' })
  @ApiResponse({ status: 200, type: RoleEntity })
  // @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('role/:id')
  async deleteRole(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }
}
