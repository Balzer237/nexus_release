import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class VerifyToken{

    constructor(private readonly jwt:JwtService){};

    async verify(token:string){
        const payload = this.jwt.verify(token);
        if(!payload) throw new UnauthorizedException('token not valid');

        return payload;
    }

}