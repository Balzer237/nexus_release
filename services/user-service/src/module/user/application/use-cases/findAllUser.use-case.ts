import { Inject, Injectable } from '@nestjs/common';
import { filterUserDto } from 'src/module/user/adapter/dto/entrant/getUserDto';
import { UserRepositoryInterface } from 'src/module/user/domaine/repository/repositoryInterface';

@Injectable()
export class FindAllUsersUseCase {
  constructor(
      @Inject('USER_REPOSITORY') private userRepository: UserRepositoryInterface,
    ) {}

  async execute(meta: filterUserDto) {
    return this.userRepository.findAll(meta);
  }
}
