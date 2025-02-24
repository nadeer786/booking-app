import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';
import { EventRepository } from './repositories/event.repository';
import { EventMockRepository } from './repositories/event.mock.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [
    EventResolver,
    EventService,
    {
      provide: 'IEventRepository',
      useClass:
        process.env.NODE_ENV === 'test' ? EventMockRepository : EventRepository,
    },
  ],
})
export class EventModule {}
