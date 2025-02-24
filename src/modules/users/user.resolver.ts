import {
  Resolver,
  Query,
  Mutation,
  Args,
  // ResolveField,
  // Parent,
} from '@nestjs/graphql';
import { User } from './entities/user.entity';
// import { Event } from '../events/entities/event.entity';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user-input.dto';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Query(() => User)
  async user(@Args('id') id: number) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserDto) {
    return this.userService.create(input);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('input') input: UpdateUserDto,
  ) {
    return this.userService.update(id, input);
  }

  // @Mutation(() => Boolean)
  // async deleteUser(@Args('id') id: number) {
  //   return this.userService.delete(id);
  // }

  // @ResolveField('events', () => [Event])
  // async getEvents(@Parent() user: User) {
  //   const { id } = user;
  //   const userWithEvents = await this.userService.findById(id);
  //   return userWithEvents?.events || [];
  // }
}
