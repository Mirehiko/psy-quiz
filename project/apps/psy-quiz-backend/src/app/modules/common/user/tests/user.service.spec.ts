import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleService } from '../../role/role.service';
import { UserEntity } from '../schemas/user.entity';
import { UserService } from '../user.service';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<UserEntity>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
  find: jest.fn().mockImplementation(() => [])
}));

describe('UserService', () => {
  let service: UserService;
  let repositoryMock: MockType<Repository<UserEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: RoleService,
          useValue: jest.fn()
        },
        // Provide your mock instead of the actual repository
        { provide: getRepositoryToken(UserEntity), useFactory: repositoryMockFactory }
      ]
    }).compile();
    service = module.get<UserService>(UserService);
    repositoryMock = module.get(getRepositoryToken(UserEntity));
  });

  it('should find a user', async () => {
    const user = { name: 'Alni', id: '123' };
    // Now you can control the return value of your mock's methods
    const spyFindOne = jest.spyOn(repositoryMock, 'findOne').mockReturnValue(user);

    await service.getByID(user.id).then((u) => {
      expect(u).toEqual(user);
      // And make assertions on how often and with what params your mock's methods are called
      expect(spyFindOne).toHaveBeenCalledWith({ relations: [], where: { id: '123' } });
    });
  });
});
