import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { IUserRepository } from './user.repository.interface';
import { CreateUserDto, UpdateUserDto } from '../dto/user-input.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['events'],
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['events'],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['events'],
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (data.email && data.email !== user.email) {
      const existingUser = await this.findByEmail(data.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
    }

    Object.assign(user, data);
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
