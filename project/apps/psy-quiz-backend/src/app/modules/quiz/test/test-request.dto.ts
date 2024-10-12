import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, MaxLength } from 'class-validator';

@InputType()
export class TestRequestDto {
  @Field()
  @MaxLength(30)
  title: string;

  @Field({ nullable: false })
  @IsNumber()
  price: string;
}
