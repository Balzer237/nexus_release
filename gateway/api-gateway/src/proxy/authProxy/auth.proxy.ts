import { Body, Controller, Post, Req } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { RegistryDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { forward } from "src/lib/requetForwar";

@Controller('auth')
export class AuthProxyController{
    constructor(private readonly http:HttpService){};

    @Post('registry')
    async handleRegistry(@Body() payload:RegistryDto,@Req() req:any){

        return forward(
              this.http,
              "auth_service",
              'post',
              '/auth/registry',
              req,
              payload,
            );
    }

    @Post('login')
    async handleLogin(@Body() payload:LoginDto,@Req() req:any){
        return forward(
              this.http,
              "auth_service",
              'post',
              '/auth/login',
              req,
              payload,
            );
    }

    @Post('logout')
    async handleLogout(@Req() req:any){

        return forward(
              this.http,
              "auth_service",
              'post',
              '/auth/logout',
              req,
            );
        }
}