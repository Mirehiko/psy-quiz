import {Entity, Column, ManyToMany, JoinTable, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {PermissionEntity} from "../../permission/schemas/permission.entity";


@Entity()
export class RoleEntity {
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({example: 'ADMIN', description: 'Уникальное название роли'})
  @Column({ length: 50 })
  name: string;

  @ApiProperty({example: 'Администратор', description: 'Название роли'})
  @Column({ length: 150 })
  displayName: string;

  @ApiProperty({example: 'Некоторое описание роли', description: 'Описание роли'})
  @Column({ length: 500 })
  description: string;

  @ApiProperty({example: 'Список разрешений', description: 'Список разрешений, которыми обладает роль'})
  // @ManyToMany(() => Permission, bill => bill.id, {onDelete: "NO ACTION"})
  @ManyToMany(() => PermissionEntity)
  @JoinTable()
  permissions: PermissionEntity[];
}
