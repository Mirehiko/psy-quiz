import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'test' })
export class TestModel {
  @Field((type) => ID)
  id: string;

  @Directive('@upper')
  @Field()
  title: string;

  @Field()
  price: number;
}
