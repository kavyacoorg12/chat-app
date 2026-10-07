import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user.repository.js';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema.js';
import { HydratedDocument, Model } from 'mongoose';
import { User } from '../entities/user.entity.js';

type UserDocument = HydratedDocument<UserSchema>;
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly userModel: Model<UserSchema>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this.userModel.findOne({ email });
    return doc ? this.map(doc) : null;
  }
  async create(
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    const doc = await this.userModel.create(data);
    return this.map(doc);
  }

  private map(doc: UserDocument): User {
    return {
      id: doc._id.toString(),
      email: doc.email,
      password: doc.password,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
