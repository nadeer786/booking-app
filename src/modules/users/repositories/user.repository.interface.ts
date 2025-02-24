import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/user-input.dto';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserDto): Promise<User>;
  update(id: number, data: UpdateUserDto): Promise<User>;
  //   delete(id: number): Promise<boolean>;
}
