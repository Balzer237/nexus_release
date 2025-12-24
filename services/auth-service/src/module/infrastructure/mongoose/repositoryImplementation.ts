import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "src/module/adapter/dto/createUserDto";
import { RepositoryInterface } from "src/module/domain/repository/repositoryInterface";
import { userDocument } from "./schema/loginSchema";
import { Model } from "mongoose";

@Injectable()
export class RepositoryImplementation implements RepositoryInterface{

    constructor(@Inject('userSchema') private readonly userModel:Model<userDocument>){}

    async createUser({ data }: { data: CreateUserDto; }): Promise<any> {
        try {
            console.log('creation de user en auth',data);
            await new this.userModel(data).save();
        } catch (error) {
            throw new InternalServerErrorException('internal erro ' + error + '');
        }
    }
    async getUserByEmail({ email }: { email: string; }): Promise<any> {
        try {
            const response = await this.userModel.findOne({email});
            return response;
        } catch (error) {
            throw new InternalServerErrorException('Internal error',error)
        }
    }
}