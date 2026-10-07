import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto.js';

@Injectable()
export class AuthService {
  signup(dto:SignupDto) {
    return 'Signup successfull';
  }
}
