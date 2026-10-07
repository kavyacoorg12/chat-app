import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, userSchema, } from './schemas/user.schema.js';
import { UserRepository } from './repositories/mongo-user.repository.js';
import { USER_REPOSITORY } from './repositories/user.repository.js';

@Module({
  providers: [UsersService,{
    provide:USER_REPOSITORY,
    useClass:UserRepository
  }],
  imports: [
    MongooseModule.forFeature([
      {
        name: UserSchema.name,
        schema: userSchema,
      },
    ]),
  ],
})
export class UsersModule {}
