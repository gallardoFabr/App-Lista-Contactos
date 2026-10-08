import { PrismaService } from '../infrastructure/prisma/prisma.service.js';
import { userEntity } from './user.entity.js';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findOneUser(username: string): Promise<userEntity | null | undefined>;
}
