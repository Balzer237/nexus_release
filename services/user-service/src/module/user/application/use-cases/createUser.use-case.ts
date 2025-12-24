import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/module/user/adapter/dto/entrant/create-user-dto';
import { UserRepositoryInterface } from 'src/module/user/domaine/repository/repositoryInterface';
@Injectable()
export class CreateUserUseCase {
  constructor(
      @Inject('USER_REPOSITORY') private userRepository: UserRepositoryInterface,
      @Inject('NATS_PROVIDER') private readonly natsClient: ClientProxy,
    ) {}
    async onModuleInit() {
      await this.natsClient.connect();
      console.log('✅ NATS client ready');
    }
  async execute(createUserDto: CreateUserDto) {
    const exist = await this.userRepository.findByEmail(createUserDto.email);
    if (exist) {
      console.log('email already used')
      throw new ConflictException('Email already used');
    }
    const hashedPassord = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassord;
    const response= this.userRepository.create(createUserDto);

    // event emitted
    this.natsClient.emit('user.created', response);
    
    return response;
  }
}
