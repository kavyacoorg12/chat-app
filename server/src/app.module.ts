import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envValidationSchema } from './config/env.validation.js';
import { appConfig } from './config/configuration.js';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentModule } from './document/document.module.js';
import { StorageModule } from './common/storage/storage.module.js';

@Module({
  imports: [AuthModule, UsersModule,
    ConfigModule.forRoot({
      isGlobal:true,
      load:[appConfig],
      validationSchema:envValidationSchema
    }),
    MongooseModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>({
       uri:configService.get<string>('db.url')
      })
    }),
    DocumentModule,
    StorageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
