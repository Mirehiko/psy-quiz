import { NotFoundException, Req, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { TestRequestDto } from '../dto/test.dto';
import { TestEntity } from './schemas/test.entity';
import { TestService } from './test.service';

@Resolver('Test')
export class TestResolver {
  constructor(private test: TestService) {}

  @Query((returns) => [TestEntity])
  async getAll(): Promise<TestEntity[]> {
    return this.test.getAll();
  }

  @Query((returns) => TestEntity)
  async getOne(@Args('id') id: string): Promise<TestEntity> {
    const recipe = await this.test.getByID(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Mutation((returns) => TestEntity)
  @UseGuards(JwtAuthGuard)
  async add(@Args('requestDto') requestDto: TestRequestDto, @Req() request): Promise<TestEntity> {
    const entity = await this.test.create(requestDto, request.user);
    // pubSub.publish('recipeAdded', { recipeAdded: recipe });
    return entity;
  }

  @Mutation((returns) => Boolean)
  async remove(@Args('id') id: string) {
    return this.test.delete([id]);
  }
}
