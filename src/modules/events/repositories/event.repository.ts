import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event as EventEntity } from '../entities/event.entity';
import { IEventRepository } from './event.repository.interface';
import { CreateEventInput, EventFilterInput } from '../dto/event-input';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class EventRepository implements IEventRepository {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(filter?: EventFilterInput): Promise<EventEntity[]> {
    const query = this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.user', 'user');

    if (filter?.location) {
      query.andWhere('event.location = :location', {
        location: filter.location,
      });
    }

    if (filter?.startDate) {
      query.andWhere('event.date >= :startDate', {
        startDate: filter.startDate,
      });
    }

    if (filter?.endDate) {
      query.andWhere('event.date <= :endDate', { endDate: filter.endDate });
    }

    return Promise.resolve(query.getMany());
  }

  async findById(userId: number): Promise<EventEntity | null> {
    return this.eventRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['user'],
    });
  }

  async create(data: CreateEventInput): Promise<EventEntity> {
    const event = this.eventRepository.create({
      title: data.title,
      description: data.description,
      location: data.location,
      date: data.date,
      userId: data.userId,
    });

    return this.eventRepository.save(event);
  }

  async search(query: string): Promise<EventEntity[]> {
    return this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.user', 'user')
      .where('event.title ILIKE :query OR event.description ILIKE :query', {
        query: `%${query}%`,
      })
      .getMany();
  }
}
