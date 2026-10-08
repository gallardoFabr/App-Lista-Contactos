import { Strategy } from 'passport-jwt';
import { IPayloadLogin } from '../auth.service.js';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: IPayloadLogin): {
        userId: number;
        username: string;
    };
}
export {};
