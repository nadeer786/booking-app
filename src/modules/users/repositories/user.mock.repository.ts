import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { IUserRepository } from './user.repository.interface';
import { CreateUserDto, UpdateUserDto } from '../dto/user-input.dto';

@Injectable()
export class UserMockRepository implements IUserRepository {
  private users: User[] = [];
  private currentId = 1;
  findAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }
  findById(id: number): Promise<User | null> {
    return Promise.resolve(this.users.find((user) => user.id === id) || null);
  }
  findByEmail(email: string): Promise<User | null> {
    return Promise.resolve(
      this.users.find((user) => user.email === email) || null,
    );
  }

  async create(data: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const user = {
      id: this.currentId++,
      ...data,
      events: [],
    } as User;

    this.users.push(user);
    return user;
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    if (data.email && data.email !== this.users[userIndex].email) {
      const existingUser = await this.findByEmail(data.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...data,
    };

    return this.users[userIndex];
  }

  //   delete(id: number): boolean {
  //     const initialLength = this.users.length;
  //     this.users = this.users.filter((u) => u.id !== id);
  //     return this.users.length < initialLength;
  //   }
}
