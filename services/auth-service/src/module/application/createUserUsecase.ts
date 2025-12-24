import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../adapter/dto/createUserDto";
import { RepositoryInterface } from "../domain/repository/repositoryInterface";

@Injectable()
export class CreateUser{
    constructor(@Inject('RepositoryImplementation') private readonly repo:RepositoryInterface){};
    async execute({data}:{data:CreateUserDto}){
        console.log('dans le usecase de auth',data)
       await this.repo.createUser({data});
    }
}