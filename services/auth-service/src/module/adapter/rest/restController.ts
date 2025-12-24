import { Body, Controller, Injectable, Post } from "@nestjs/common";
import { LoginUseCase } from "src/module/application/login.usecase";

@Controller()
export class AuthController{
    constructor(private readonly loginUseCase:LoginUseCase){};

    @Post('auth/login')
    handleLogin(@Body() payload:{email:string,password:string}){
        return this.loginUseCase.execute(payload)
    }
}