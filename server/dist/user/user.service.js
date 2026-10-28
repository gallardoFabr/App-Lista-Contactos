var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOneUser(username) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    username,
                },
            });
            if (user)
                return user;
            return null;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new InternalServerErrorException(error.message);
            }
        }
    }
    async crateUser(body) {
        try {
            const validation = await this.prisma.user.findFirst({
                where: {
                    username: body.username,
                },
            });
            if (validation)
                throw new BadRequestException('Este usuario ya está en uso');
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(body.password, salt);
            const newUser = await this.prisma.user.create({
                data: {
                    name: body.name,
                    username: body.username,
                    password: hash,
                },
            });
            const { password, ...result } = newUser;
            return result;
        }
        catch (error) {
            if (error instanceof BadRequestException)
                throw new BadRequestException(error.message);
            if (error instanceof Error)
                throw new InternalServerErrorException(error.message);
        }
    }
    async getUserById(userId) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    contacs: true,
                },
            });
            if (!user)
                throw new NotFoundException('User not found');
            const { password, ...result } = user;
            return result;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new InternalServerErrorException(error.message);
            }
            if (error instanceof NotFoundException)
                throw new NotFoundException(error.message);
        }
    }
};
UserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map