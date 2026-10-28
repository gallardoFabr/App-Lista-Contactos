import { AuthService } from './auth.service.js';
import { UserService } from '../user/user.service.js';
import { CreateUserDto } from '../user/dto/create-user.dto.js';
import { userEntity } from '../user/user.entity.js';
import type { IRequestAuth } from './request-auth.js';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    register(body: CreateUserDto): Promise<userEntity | undefined>;
    login(req: any): Promise<{
        user: userEntity;
        access_token: string;
    }>;
    getProfile(req: IRequestAuth): Promise<userEntity | undefined>;
}
