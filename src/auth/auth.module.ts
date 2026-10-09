import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UsersModule } from '../users/users.module.js';
import { PASSWORD_HASHER } from './hasher/password.hasher.js';
import { BcryptPasswordHasher } from './hasher/bcrypt.password.hasher.js';

@Module({
  imports:[UsersModule],
  controllers: [AuthController],
  providers: [AuthService,{
    provide:PASSWORD_HASHER,
    useClass:BcryptPasswordHasher
  }]
})
export class AuthModule {}
