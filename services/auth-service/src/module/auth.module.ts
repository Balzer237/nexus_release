import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { loginSchema } from './infrastructure/mongoose/schema/loginSchema';
import { RepositoryImplementation } from './infrastructure/mongoose/repositoryImplementation';
import { CreateUser } from './application/createUserUsecase';
import { EventController } from './adapter/nats/eventController';
import { LoginUseCase } from './application/login.usecase';

@Module({
    imports:[
        MongooseModule.forFeature([{name:'userSchema', schema:loginSchema}])
    ],
    providers:[
        
        {
            provide:'RepositoryImplementation',
            useClass:RepositoryImplementation
        },
        {
            provide: 'NATS_PROVIDER',
            useFactory: () => {
                return ClientProxyFactory.create({
                    transport: Transport.NATS,
                    options: {
                    servers: [process.env.NATS_URL || 'nats://localhost:4222'],
                    },
                });
            }
        },

        LoginUseCase,
        CreateUser,
    ],
    controllers:[EventController]
})
export class AuthModule {

}
