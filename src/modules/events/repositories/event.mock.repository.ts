import { Injectable } from '@nestjs/common';
import { Event as EventEntity } from '../entities/event.entity';
import { IEventRepository } from './event.repository.interface';
import { CreateEventInput, EventFilterInput } from '../dto/event-input';

@Injectable()
export class EventMockRepository implements IEventRepository {
  private events: EventEntity[] = [];

  findAll(filter?: EventFilterInput): Promise<EventEntity[]> {
    let filteredEvents = [...this.events];

    if (filter?.location) {
      filteredEvents = filteredEvents.filter(
        (event) => event.location === filter.location,
      );
    }

    // if (filter?.startDate) {
    //   filteredEvents = filteredEvents.filter((e) => e.date >= filter.startDate);
    // }

    // if (filter?.endDate) {
    //   filteredEvents = filteredEvents.filter((e) => e.date <= filter.endDate);
    // }

    return Promise.resolve(filteredEvents);
  }

  findById(id: number): Promise<EventEntity> {
    const event = this.events.find((e) => e.id === id);
    if (!event) {
      throw new Error(`Event with id ${id} not found`);
    }
    return Promise.resolve(event);
  }

  create(data: CreateEventInput): Promise<EventEntity> {
    const event = {
      id: Math.random().toString(),
      ...data,
      ticketsBooked: 0,
      user: { id: data.userId },
    } as unknown as EventEntity;

    this.events.push(event);
    return Promise.resolve(event);
  }

  search(query: string): Promise<EventEntity[]> {
    return Promise.resolve(
      this.events.filter(
        (e) =>
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.description.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }
}
