import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../service/auth.service";
import { Injectable } from "@nestjs/common";
import { SigninRequestDto } from "src/domain/user/dto/siginin-req.dto";
import { Request } from "express";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    // argument인 username과 password는 passport에서 정해놓은 이름으로, 
    // passport를 이용하는 경우 이름을 바꾸면 호출이 안될 수 있다.
    async validate(username: string, password: string) {
        const email = username;
        const user = await this.authService.validate(email, password);
        return user;
    }
}