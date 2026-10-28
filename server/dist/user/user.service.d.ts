import { PrismaService } from '../infrastructure/prisma/prisma.service.js';
import { userEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findOneUser(username: string): Promise<userEntity | null | undefined>;
    crateUser(body: CreateUserDto): Promise<userEntity | undefined>;
    getUserById(userId: number): Promise<userEntity | undefined>;
}
