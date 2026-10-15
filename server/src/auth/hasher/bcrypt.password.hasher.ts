import { Injectable } from '@nestjs/common';
import { IPasswordHasher } from './password.hasher.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptPasswordHasher implements IPasswordHasher {
  private readonly saltRounds=10;
  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
  comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
