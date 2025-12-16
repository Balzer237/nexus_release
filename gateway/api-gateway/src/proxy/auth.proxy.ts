import { Body, Controller, Post } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Controller('auth')
export class AuthProxyController{
    constructor(private readonly http:HttpService){};

    @Post('registry')
    async handleRegistry(@Body() payload:{email:string,pseudo:string,password:string}){
        const res=await firstValueFrom( this.http.post(
            'http://auth_service:3000/auth/registry',
            {payload}
            
        ));
        return res.data;
    }

    @Post('login')
    async handleLogin(@Body() payload:{email:string,password:string}){
         const res=await firstValueFrom(  this.http.post(
            'http://auth_service:3000/auth/login',
            {payload} 
        ));
        return res.data;

    }

    @Post('logout')
    async handleLogout(){
         const res=await firstValueFrom(  this.http.post(
            'http://auth_service:3000/auth/logout',
        ));
        return res.data;
    }
}