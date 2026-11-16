import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { AUTH_MESSAGES } from '../constants/auth.message.js';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.cookies?.access_token;

    if (!token) {
      throw new UnauthorizedException(AUTH_MESSAGES.ERROR.UNAUTHORIZED);
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      (request as Request & { user: typeof payload }).user = payload;
      return true;
    } catch {
      throw new UnauthorizedException(AUTH_MESSAGES.ERROR.INVALID_TOKEN);
    }
  }
}
