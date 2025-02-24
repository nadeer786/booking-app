import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from './repositories/user.repository.interface';
import { CreateUserDto, UpdateUserDto } from './dto/user-input.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async findAll() {
    return this.userRepository.findAll();
  }

  async findById(id: number) {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async create(data: CreateUserDto) {
    return this.userRepository.create(data);
  }

  async update(id: number, data: UpdateUserDto) {
    return this.userRepository.update(id, data);
  }

  // async delete(id: number) {
  //   return this.userRepository.delete(id);
  // }
}
