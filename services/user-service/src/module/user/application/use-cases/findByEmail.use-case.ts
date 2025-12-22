import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from 'src/module/user/domaine/repository/repositoryInterface';

@Injectable()
export class FindByEmailUseCase {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: UserRepositoryInterface,
  ) {}

  async execute(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
