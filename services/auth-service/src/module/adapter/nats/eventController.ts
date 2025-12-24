import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { CreateUserDto } from "../dto/createUserDto";
import { CreateUser } from "src/module/application/createUserUsecase";
import { Controller } from "@nestjs/common";

@Controller()
export class EventController{

    constructor(
        private readonly createUser:CreateUser,
    ){}

    @EventPattern('user.created')
    handleUserCreated(data) {
        console.log('je suis la data a auth',data);
        const payload:CreateUserDto={
            id:data.id,
            password:data.password,
            username:data.username,
            bio:data.bio
        };
        this.createUser.execute({data:payload})

    }

}