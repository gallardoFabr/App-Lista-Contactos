var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
let AuthService = class AuthService {
    userService;
    jwtService;
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(body) {
        try {
            const user = await this.userService.findOneUser(body.username);
            if (!user)
                return null;
            const match = await bcrypt.compare(body.password, user.password ?? "");
            if (match) {
                const { password, ...result } = user;
                return result;
            }
            return null;
        }
        catch (error) {
            if (error instanceof Error)
                throw new InternalServerErrorException(error.message);
        }
    }
    async login(user) {
        const payload = { username: user.username, sub: user.id };
        const token = await this.jwtService.signAsync(payload);
        return { user, access_token: token };
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UserService, JwtService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map