import { CreateEventInput } from '../dto/event-input';
import { Event as EventEntity } from '../entities/event.entity';

export interface IEventRepository {
  findAll(filter?: any): Promise<EventEntity[]>;
  findById(userId: number): Promise<EventEntity | null>;
  create(data: CreateEventInput): Promise<EventEntity>;
  search(query: string): Promise<EventEntity[]>;
}
