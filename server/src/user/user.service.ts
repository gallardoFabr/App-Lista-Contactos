import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service.js';
import { userEntity } from './user.entity.js';

@Injectable()
export class UserService {
    constructor (private readonly prisma : PrismaService){ }

    async findOneUser(username : string) : Promise<userEntity | null | undefined>{
        try {
            const user = await this.prisma.user.findUnique({
                where : {
                username,
                }
            })
            if (user) return user;
            return null;
        } catch (error){
            if (error instanceof Error){
                throw new InternalServerErrorException(error.message);
            }
        }
    }

}
