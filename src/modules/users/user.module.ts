import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import { UserMockRepository } from './repositories/user.mock.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserResolver,
    UserService,
    {
      provide: 'IUserRepository',
      useClass:
        process.env.NODE_ENV === 'test' ? UserMockRepository : UserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
