import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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
import { LoginDto } from './dto/login.dto.js';
import { type ITokenService, TOKEN_SERVICE } from './token/token.service.js';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_HASHER) private readonly passwordHasher: IPasswordHasher,
    @Inject(TOKEN_SERVICE) private readonly tokenService:ITokenService
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
  async login(dto:LoginDto){
    const user=await this.userRepository.findByEmail(dto.email)
    const password=user?await this.passwordHasher.comparePassword(dto.password,user?.passwordHash):false
    if(!user||!password)
    {
      throw new UnauthorizedException(AUTH_MESSAGES.ERROR.INVALID_CREDENTIALS)
    }
    const token=await this.tokenService.sign({id:user.id,email:user.email})
    return {token}
  }
}


