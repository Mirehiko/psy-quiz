import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BanUserDto, IUserGetParamsData, UserRequestDto, UserRolesDto } from '../../../shared';
import { BaseService } from '../base-service';
import { RoleService } from '../role/role.service';
import { UserEntity } from './schemas/user.entity';
import { UserRepository } from './user-repository';

@Injectable()
export class UserService extends BaseService<UserEntity, IUserGetParamsData> {
  private readonly saltRounds = 10;
  protected entityNotFoundMessage: string = 'Нет такого пользователя';
  protected entityOrRelationNotFoundMessage: string = 'Пользователь или роль не найдены';

  constructor(protected repository: UserRepository, private roleService: RoleService) {
    super();
  }

  /**
   * Creating new user
   * @param requestDto
   */
  async createUser(@Param() requestDto: UserRequestDto): Promise<any> {
    const candidate = await this.repository.findOne({ where: { email: requestDto.email } });
    if (candidate) {
      throw new HttpException('Такой email уже существует. Введите другой email', HttpStatus.CONFLICT);
    }

    const newUser = await this.repository.create({ ...requestDto });

    try {
      let role;
      if (!requestDto.roles || !requestDto.roles.length) {
        role = await this.roleService.getByID('1', ['permissions']); // TODO: roles
        newUser.roles = [role];
      }

      return await this.repository.save(newUser); // 200
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * Update user data
   * @param id
   * @param requestDto
   * @param avatar
   */
  async updateUser(@Param() id: string, requestDto: UserRequestDto, avatar?: any): Promise<UserEntity> {
    let user = await this.repository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
    }
    user.email = requestDto.email ? requestDto.email : user.email;
    user.password = requestDto.password ? requestDto.password : user.password;
    // operation.avatar = userRequestDto.avatar ? userRequestDto.avatar : operation.avatar;
    user.name = requestDto.name ? requestDto.name : user.name;

    if (avatar) {
    }

    try {
      await this.repository.save(user);
      if (requestDto.roles) {
        user = await this.assignRolesToUser({ userId: user.id, roles: requestDto.roles });
      }
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   * @param id
   * @param password
   */
  async updateUserPass(@Param() id: string, password: string): Promise<void> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(this.entityNotFoundMessage, HttpStatus.NOT_FOUND);
    }
    user.password = password ? password : user.password;
    await this.repository.save(user);
  }

  /**
   *
   * @param userRolesDto
   */
  async assignRolesToUser(userRolesDto: UserRolesDto): Promise<any> {
    const user = await this.repository.findOne({ where: { id: userRolesDto.userId }, relations: ['roles'] });
    const roles = await this.roleService.getBy(
      {
        params: {}
      },
      ['permissions']
    );

    if (userRolesDto.roles.length && user) {
      if (userRolesDto.replaceRoles) {
        user.roles = [roles];
      } else {
        const uRoles = user.roles.map((ur) => ur.id);
        user.roles = [roles].filter((r) => !uRoles.includes(r.id)).concat(user.roles);
      }
      await this.repository.save(user);
      return await this.getBy({ params: { id: user.id } }, ['roles', 'roles.permissions']);
    }
    throw new HttpException(this.entityOrRelationNotFoundMessage, HttpStatus.NOT_FOUND);
  }

  /**
   *
   * @param userRolesDto
   */
  async removeUserRoles(userRolesDto: UserRolesDto): Promise<any> {
    const user = await this.repository.findOne({ where: { id: userRolesDto.userId }, relations: ['roles'] });

    if (userRolesDto.roles.length && user) {
      const roles = userRolesDto.roles.map((r) => r.id);
      user.roles = user.roles.filter((ur) => !roles.includes(ur.id));
      await this.repository.save(user);
      return await this.getBy({ params: { id: user.id } }, ['roles', 'roles.permissions']);
    }
    throw new HttpException(this.entityOrRelationNotFoundMessage, HttpStatus.NOT_FOUND);
  }

  /**
   * Suspend the user
   * @param banUserDto
   */
  async suspend(banUserDto: BanUserDto): Promise<any> {
    const users = await this.repository
      .createQueryBuilder('user')
      .where('operation.id IN (:userIds)', { userIds: banUserDto.userIds })
      .getMany();

    if (users.length) {
      users.forEach((user) => {
        user.suspendedAt = new Date();
        user.suspendReason = banUserDto.reason;
      });
      await this.repository.save(users);
      const uText = users.length > 1 ? 'Пользователи' : 'Пользователь';
      return { statusText: `${uText} успешно забанены`, status: HttpStatus.OK };
    }
    throw new HttpException('Пользователи не найдены', HttpStatus.NOT_FOUND);
  }

  /**
   *
   * @param banUserDto
   */
  async unsuspend(banUserDto: BanUserDto): Promise<any> {
    const users = await this.repository
      .createQueryBuilder('user')
      .where('operation.id IN (:userIds)', { userIds: banUserDto.userIds })
      .getMany();

    if (users.length) {
      users.forEach((user) => {
        user.suspendedAt = null;
        user.suspendReason = null;
      });
      await this.repository.save(users);
      const uText = users.length > 1 ? 'Пользователи' : 'Пользователь';
      return { statusText: `${uText} успешно забанены`, status: HttpStatus.OK };
    }
    throw new HttpException('Пользователи не найдены', HttpStatus.NOT_FOUND);
  }

  /**
   *
   * @param password
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }
}
