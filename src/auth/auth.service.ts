import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto.js';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '../users/repositories/user.repository.js';
import { AUTH_MESSAGES } from '../common/constants/auth.message.js';
import {
  type IPasswordHasher,
  PASSWORD_HASHER,
} from './hasher/password.hasher.js';
import { toSignupResponseDto } from './mappers/auth.mappers.js';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_HASHER) private readonly passwordHasher: IPasswordHasher,
  ) {}
  async signup(dto: SignupDto) {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException(AUTH_MESSAGES.ERROR.EMAIL_ALREADY_EXISTS);
    }
    const passwordHash = await this.passwordHasher.hashPassword(dto.password);
    const user = await this.userRepository.create({
      email: dto.email,
      passwordHash,
    });
    return toSignupResponseDto(user);
  }
}
