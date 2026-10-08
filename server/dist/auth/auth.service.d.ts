import { UserService } from '../user/user.service.js';
import { LoginDto } from './dto/login.dto.js';
import { userEntity } from '../user/user.entity.js';
import { JwtService } from '@nestjs/jwt';
export interface IPayloadLogin {
    sub: number;
    username: string;
}
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(body: LoginDto): Promise<{
        id: number;
        name: string;
        username: string;
        createdAt: Date;
        contacts?: any[];
    } | null | undefined>;
    login(user: userEntity): Promise<{
        user: userEntity;
        access_token: string;
    }>;
}
