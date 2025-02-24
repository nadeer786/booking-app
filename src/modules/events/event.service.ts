import { Inject, Injectable } from '@nestjs/common';
import { EventRepository } from './repositories/event.repository';
import { CreateEventInput, EventFilterInput } from './dto/event-input';

@Injectable()
export class EventService {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: EventRepository,
  ) {}

  async findAll(filter?: EventFilterInput) {
    return this.eventRepository.findAll(filter);
  }

  async search(query: string) {
    return this.eventRepository.search(query);
  }

  async create(input: CreateEventInput) {
    return this.eventRepository.create(input);
  }
}
