import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  name: string;
  @Field()
  email: string;
}

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  email?: string;
}
