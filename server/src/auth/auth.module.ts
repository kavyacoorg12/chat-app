import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UsersModule } from '../users/users.module.js';
import { PASSWORD_HASHER } from './hasher/password.hasher.js';
import { BcryptPasswordHasher } from './hasher/bcrypt.password.hasher.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TOKEN_SERVICE } from './token/token.service.js';
import { TokenService } from './token/jwt.token.service.js';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('jwt.jwt_secret'),
        signOptions: {
          expiresIn: Number(
            configService.getOrThrow<string>('jwt.jwt_expire_in'),
          ),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: PASSWORD_HASHER,
      useClass: BcryptPasswordHasher,
    },
    {
      provide: TOKEN_SERVICE,
      useClass: TokenService,
    },
  ],
})
export class AuthModule {}
