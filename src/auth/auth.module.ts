import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UserModule } from 'src/users/user.module';


@Module({
    imports: [
      JwtModule.register({
        secret: process.env.JWT_SECRET || 'changeme',
        signOptions: { expiresIn: '7d' },
      }),
      UserModule,
      TypeOrmModule.forFeature([User]),
    ],
    providers: [AuthService],
    controllers: [AuthController],
  })
  export class AuthModule {}
