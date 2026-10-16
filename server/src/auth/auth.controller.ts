import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignupDto } from './dto/signup.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { type Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AUTH_MESSAGES } from '../common/constants/auth.message.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}
  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto);
    const cookieMaxAge = this.configService.get<number>(
      'cookie.cookie_max_age',
    )!;
    res.cookie('access_token', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: cookieMaxAge * 60 * 1000,
    });

    return {
      message: AUTH_MESSAGES.SUCCESS.LOGIN,
    };
  }
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    return {
      message: AUTH_MESSAGES.SUCCESS.LOGOUT,
    };
  }
}
