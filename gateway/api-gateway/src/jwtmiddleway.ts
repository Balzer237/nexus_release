import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class jwtMiddleway implements NestMiddleware{
     constructor(private readonly jwtService: JwtService) {};

    use(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers['authorization'];
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing token');
        }
        const token = authorization.split(' ')[1];
        try{
            const payload = this.jwtService.verify(token)
            req['user']=payload;
            next()
        }catch{
            throw new UnauthorizedException('Invalid token')
        }

    }
}