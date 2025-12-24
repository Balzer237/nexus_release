import { CreateUserDto } from "src/module/adapter/dto/createUserDto";

export abstract class RepositoryInterface{

    abstract createUser({data}:{data:CreateUserDto}):Promise<any>;
    abstract getUserByEmail({email}:{email:string}):Promise<any>;
    
}