import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Event as EventEntity } from './entities/event.entity';
import { EventService } from '../events/event.service';
import { CreateEventInput, EventFilterInput } from './dto/event-input';

@Resolver(() => EventEntity)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query(() => [EventEntity])
  async events(@Args('filter', { nullable: true }) filter?: EventFilterInput) {
    return this.eventService.findAll(filter);
  }

  @Query(() => [EventEntity])
  async searchEvents(@Args('query') query: string) {
    return this.eventService.search(query);
  }

  @Mutation(() => EventEntity)
  createEvent(@Args('input') input: CreateEventInput): Promise<EventEntity> {
    return this.eventService.create(input);
  }
}
