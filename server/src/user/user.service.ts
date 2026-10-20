import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service.js';
import { userEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';

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
      const newUser = await this.prisma.user.create({
        data: {
          name: body.name,
          username: body.username,
          password: body.password,
        },
      });

      const { password, ...result } = newUser;
      return result;
    } catch (error) {
      if (error instanceof Error)
        throw new InternalServerErrorException(error.message);
    }
  }

  async getUser(userId: number): Promise<userEntity | undefined> {
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
