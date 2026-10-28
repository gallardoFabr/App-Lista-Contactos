import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserService } from '../user/user.service.js';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy.js';
import { JwtStrategy } from './strategy/jwt.strategy.js';

@Module({
   providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
   imports: [
      PassportModule,
      JwtModule.register({
         secret: process.env.SECRET_KEY,
         signOptions: { expiresIn: '8hrs' },
      }),
   ],
   controllers: [AuthController],
})
export class AuthModule {}
