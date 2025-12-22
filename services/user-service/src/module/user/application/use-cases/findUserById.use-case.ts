import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from 'src/module/user/domaine/repository/repositoryInterface';

@Injectable()
export class FindUserByIdUseCase {
  constructor(
      @Inject('USER_REPOSITORY') private userRepository: UserRepositoryInterface,
    ) {}

  async execute(id: string) {
    return await this.userRepository.findById(id);
  }
}
