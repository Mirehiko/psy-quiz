import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { IGetParamsData, PermissionRequestDto, PermissionResponseDto } from '../../../shared';
import { Roles } from '../auth/roles-auth.decorator';
import { PermissionService } from './permission.service';
import { PermissionEntity } from './schemas/permission.entity';

// TODO: Add auth guard after migrations release
@ApiTags('Разрешения')
@Controller('main')
@UseInterceptors(new TransformInterceptor())
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({ summary: 'Получение списка разрешений' })
  @ApiResponse({ status: 200, type: [PermissionEntity] })
  @Get('permissions')
  async getPermissions(): Promise<PermissionResponseDto[]> {
    const permissions = await this.permissionService.getAll();
    return plainToInstance(PermissionResponseDto, permissions, { enableCircularCheck: true });
  }

  @ApiOperation({ summary: 'Получение разрешения' })
  @ApiResponse({ status: 200, type: PermissionEntity })
  @Get('permission/:id')
  async getPermissionById(@Param('id') id: string): Promise<PermissionResponseDto> {
    const permission = await this.permissionService.getByID(id);
    return plainToInstance(PermissionResponseDto, permission, { enableCircularCheck: true });
  }

  @ApiOperation({ summary: 'Получение разрешения по полю' })
  @ApiResponse({ status: 200, type: PermissionEntity })
  @Get('category/:id')
  async getPermissionBy(@Body() requestParams: IGetParamsData): Promise<PermissionResponseDto> {
    const permission = await this.permissionService.getBy(requestParams);
    return plainToInstance(PermissionResponseDto, permission, { enableCircularCheck: true });
  }

  @ApiOperation({ summary: 'Обновление разрешения' })
  @ApiResponse({ status: 200, type: PermissionEntity })
  @Roles('ADMIN')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('permission/:id')
  async updatePermission(
    @Param('id') id: string,
    @Body() permissionRequestDto: PermissionRequestDto
  ): Promise<PermissionRequestDto> {
    const permission = await this.permissionService.updatePermission(id, permissionRequestDto);
    return plainToInstance(PermissionResponseDto, permission, { enableCircularCheck: true });
  }

  @ApiOperation({ summary: 'Создание разрешения' })
  @ApiResponse({ status: 201, type: PermissionEntity })
  @Roles('ADMIN')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('permission')
  async createPermission(@Body() permissionRequestDto: PermissionRequestDto): Promise<any> {
    const permission = this.permissionService.createPermission(permissionRequestDto);
    return plainToInstance(PermissionResponseDto, permission, { enableCircularCheck: true });
  }

  @ApiOperation({ summary: 'Удаление разрешения' })
  @ApiResponse({ status: 200, type: PermissionEntity })
  @Roles('ADMIN')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('permission/:id')
  async deletePermission(@Param('id') id: string): Promise<any> {
    return await this.permissionService.delete([id]);
  }
}
