# Event Booking System Documentation

## Overview

The Event Booking System is a GraphQL API built with NestJS that allows users to manage events and bookings. The system implements the repository pattern and includes comprehensive test coverage.

## Technical Stack

- **Framework**: NestJS
- **API**: GraphQL
- **Database**: PostgreSQL with TypeORM
- **Testing**: Jest
- **Language**: TypeScript

## Project Structure

```
📂 src/
 ┣ 📂 modules/
 ┃ ┣ 📂 users/
 ┃ ┃ ┣ 📂 dto/
 ┃ ┃ ┣ 📂 entities/
 ┃ ┃ ┣ 📂 repositories/
 ┃ ┃ ┣ 📂 tests/
 ┃ ┃ ┗ user.module.ts
 ┃ ┣ 📂 events/
 ┃ ┃ ┣ 📂 dto/
 ┃ ┃ ┣ 📂 entities/
 ┃ ┃ ┣ 📂 repositories/
 ┃ ┃ ┣ 📂 tests/
 ┃ ┃ ┗ event.module.ts
 ┃ ┗ 📂 common/
 ┣ 📂 config/
 ┗ 📂 test/
```

## Core Features

### 1. User Management

- Create new users
- List all users
- Update user information
- Delete users
- View user's events

### 2. Event Management

- Create events with title, description, date, and location
- List events with filtering capabilities
- Search events by title or description
- Track ticket bookings for events

## Implementation Details

### Repository Pattern

The system implements the repository pattern with both live and mock repositories:

```typescript
// Interface Definition
export interface IEventRepository {
  findAll(filter?: EventFilterDto): Promise<Event[]>;
  findById(id: number): Promise<Event | null>;
  create(data: CreateEventDto): Promise<Event>;
}

// Live Repository Implementation
@Injectable()
export class EventRepository implements IEventRepository {
  // Implementation details...
}

// Mock Repository Implementation
@Injectable()
export class EventMockRepository implements IEventRepository {
  // Mock implementation for testing...
}
```

### Entity Relationships

```typescript
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn({ name: 'userId' })
  user: User;
}
```

### GraphQL API Endpoints

#### Queries

```graphql
# List Events
query {
  events(
    filter: {
      startDate: "2025-02-23"
      endDate: "2025-02-24"
      location: "New York"
    }
  ) {
    id
    title
    description
    location
    date
    ticketsBooked
    user {
      id
      name
    }
  }
}

# Search Events
query {
  searchEvents(query: "conference") {
    id
    title
    description
  }
}

# List Users
query {
  users {
    id
    name
    email
    events {
      id
      title
    }
  }
}
```

#### Mutations

```graphql
# Create Event
mutation {
  createEvent(
    input: {
      title: "Tech Conference 2025"
      description: "Annual technology conference"
      location: "New York"
      date: "2025-06-15"
      userId: 1
    }
  ) {
    id
    title
  }
}

# Create User
mutation {
  createUser(input: { name: "John Doe", email: "john@example.com" }) {
    id
    name
    email
  }
}
```

## Testing

The system includes comprehensive test coverage using Jest:

```typescript
describe('EventService', () => {
  // Test setup and mock implementations...

  it('should create an event', async () => {
    const result = await service.create(mockEventData);
    expect(result).toMatchObject(mockEventData);
  });

  it('should filter events by location', async () => {
    const filter = { location: 'New York' };
    const result = await service.findAll(filter);
    expect(result[0].location).toBe(filter.location);
  });
});
```

## Setup Instructions

1. Clone the repository

```bash
git clone <repository-url>
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables in `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=event_booking
NODE_ENV=development
```

4. Run migrations

```bash
npm run typeorm migration:run
```

5. Start the application

```bash
npm run start:dev
```

6. Access GraphQL Playground at `http://localhost:3000/graphql`

## Error Handling

The system implements comprehensive error handling:

- Input validation using class-validator
- Custom exceptions for business logic errors
- GraphQL error formatting
- Database constraint violations handling

## Security Considerations

- Input validation on all endpoints
- Type safety with TypeScript
- Database query optimization
- Proper error handling and logging
- Repository pattern for data access abstraction

## Future Enhancements

1. Authentication and Authorization
2. Event capacity management
3. Ticket booking functionality
4. Email notifications
5. Real-time updates using subscriptions
6. Analytics and reporting

## API Performance

The system implements several performance optimizations:

- Efficient database queries using TypeORM
- Proper indexing on frequently queried fields
- Relationship eager/lazy loading configuration
- Query complexity analysis for GraphQL
