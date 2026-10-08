var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserService } from '../user/user.service.js';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy.js';
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    Module({
        providers: [AuthService, UserService, LocalStrategy],
        imports: [PassportModule, JwtModule.register({
                secret: process.env.SECRET_KEY,
                signOptions: { expiresIn: '8hrs' }
            })],
        controllers: [AuthController]
    })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map