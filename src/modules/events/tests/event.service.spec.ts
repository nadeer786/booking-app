import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from '../event.service';
import { EventMockRepository } from '../repositories/event.mock.repository';

describe('EventService', () => {
  let service: EventService;
  let repository: EventMockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: 'IEventRepository',
          useClass: EventMockRepository,
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
    repository = module.get<EventMockRepository>('IEventRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const result = await service.findAll();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should filter events by location', async () => {
      const filter = { location: 'Test Location' };
      const result = await service.findAll(filter);
      result.forEach((event) => {
        expect(event.location).toBe(filter.location);
      });
    });
  });
});
