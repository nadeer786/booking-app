import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  location: string;

  @Field()
  date: Date;

  @Field()
  userId: number;
}

@InputType()
export class EventFilterInput {
  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  location?: string;
}
