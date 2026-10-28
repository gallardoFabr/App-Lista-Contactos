import {
   BadRequestException,
   Injectable,
   InternalServerErrorException,
   NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service.js';
import { userEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
   constructor(private readonly prisma: PrismaService) {}

   async findOneUser(username: string): Promise<userEntity | null | undefined> {
      try {
         const user = await this.prisma.user.findUnique({
            where: {
               username,
            },
         });
         if (user) return user;
         return null;
      } catch (error) {
         if (error instanceof Error) {
            throw new InternalServerErrorException(error.message);
         }
      }
   }

   async crateUser(body: CreateUserDto): Promise<userEntity | undefined> {
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
      } catch (error) {
         if (error instanceof BadRequestException)
            throw new BadRequestException(error.message);
         if (error instanceof Error)
            throw new InternalServerErrorException(error.message);
      }
   }

   async getUserById(userId: number): Promise<userEntity | undefined> {
      try {
         const user = await this.prisma.user.findUnique({
            where: {
               id: userId,
            },
            include: {
               contacs: true,
            },
         });
         if (!user) throw new NotFoundException('User not found');
         const { password, ...result } = user;
         return result;
      } catch (error) {
         if (error instanceof Error) {
            throw new InternalServerErrorException(error.message);
         }
         if (error instanceof NotFoundException)
            throw new NotFoundException(error.message);
      }
   }
}
