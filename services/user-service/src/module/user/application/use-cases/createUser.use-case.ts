import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/module/user/adapter/dto/entrant/create-user-dto';
import { UserRepositoryInterface } from 'src/module/user/domaine/repository/repositoryInterface';
@Injectable()
export class CreateUserUseCase {
  constructor(
      @Inject('USER_REPOSITORY') private userRepository: UserRepositoryInterface,
    ) {}

  async execute(createUserDto: CreateUserDto) {
    const exist = await this.userRepository.findByEmail(createUserDto.email);
    if (exist) {
      throw new ConflictException('Email already used');
    }
    const hashedPassord = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassord;
    return this.userRepository.create(createUserDto);
  }
}
