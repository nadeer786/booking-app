import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './modules/users/user.module';
// import { EventModule } from './modules/events/event.module';
// import { EventResolver } from './modules/events/event.resolver';
import { UserResolver } from './modules/users/user.resolver';
import { EventModule } from './modules/events/event.module';
import { EventResolver } from './modules/events/event.resolver';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    UserModule,
    EventModule,
  ],
  controllers: [],
  providers: [UserResolver, EventResolver],
})
export class AppModule {}
