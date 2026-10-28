import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { UserService } from '../user/user.service.js';
import { CreateUserDto } from '../user/dto/create-user.dto.js';
import { userEntity } from '../user/user.entity.js';
import { LocalAuthGuard } from './guards/local.guard.js';
import { JwtAuthGuard } from './guards/jwt.-auth.guard.js';
import type { IRequestAuth } from './request-auth.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    return await this.userService.crateUser(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any) {
    return await this.authService.login(req.user as userEntity);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req: IRequestAuth) {
    return await this.userService.getUserById(req.user.userId);
  }
}
