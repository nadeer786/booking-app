import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Event } from '../../events/entities/event.entity';
import { Optional } from '@nestjs/common';
@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @Optional()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field(() => [Event])
  @OneToMany(() => Event, (event) => event.user)
  events: Event[];
}
