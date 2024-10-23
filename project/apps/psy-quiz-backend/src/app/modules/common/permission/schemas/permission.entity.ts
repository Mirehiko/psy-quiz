import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from '../../role/schemas/role.entity';

@Entity()
export class PermissionEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'permissionName', description: 'Уникальное имя разрешения' })
  @Column({ length: 50 })
  name: string;

  @ApiProperty({ example: 'Permission example', description: 'Название разрешения' })
  @Column({ length: 150 })
  displayName: string;

  @ApiProperty({ example: 'Some description...', description: 'Описание разрешения' })
  @Column({ length: 500 })
  description: string;

  @ManyToMany((type) => RoleEntity, (role) => role.permissions)
  roles: RoleEntity[];
}
