var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Post, Request, UseGuards, } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { UserService } from '../user/user.service.js';
import { CreateUserDto } from '../user/dto/create-user.dto.js';
import { LocalAuthGuard } from './guards/local.guard.js';
import { JwtAuthGuard } from './guards/jwt.-auth.guard.js';
let AuthController = class AuthController {
    authService;
    userService;
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async register(body) {
        return await this.userService.crateUser(body);
    }
    async login(req) {
        return await this.authService.login(req.user);
    }
    async getProfile(req) {
        return await this.userService.getUserById(req.user.userId);
    }
};
__decorate([
    Post('/register'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    UseGuards(LocalAuthGuard),
    Post('/login'),
    __param(0, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Get('/profile'),
    __param(0, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
AuthController = __decorate([
    Controller('auth'),
    __metadata("design:paramtypes", [AuthService,
        UserService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map