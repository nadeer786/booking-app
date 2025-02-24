import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity()
export class Event {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column({ type: 'timestamp' })
  date: Date;

  @Field()
  @Column()
  location: string;

  @Field()
  @Column({ default: 0 })
  ticketsBooked: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.events, { eager: true }) // Ensure eager loading if necessary
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field()
  @Column()
  userId: number; // Explicit foreign key column
}
