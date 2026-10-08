import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { LoginDto } from './dto/login.dto.js';
import * as bcrypt from 'bcrypt';
import { userEntity } from '../user/user.entity.js';
import { JwtService } from '@nestjs/jwt';

export interface IPayloadLogin{
    sub : number
    username : string
}

@Injectable()
export class AuthService {

    constructor (private readonly userService : UserService, private readonly jwtService : JwtService){}

    async validateUser(body : LoginDto){
        try {
            const user = await this.userService.findOneUser(body.username);
            if (!user) return null;
            const match = await bcrypt.compare(body.password, user.password ?? "");
            if (match){
                const {password, ...result} = user;
                return result;
            }
            return null;
        } catch(error){
            if (error instanceof Error) throw new InternalServerErrorException(error.message); 
        }
    }

    async login(user : userEntity){
        const payload : IPayloadLogin = {username : user.username, sub : user.id};
        const token = await this.jwtService.signAsync(payload);
        return {user, access_token : token};
    }

}
