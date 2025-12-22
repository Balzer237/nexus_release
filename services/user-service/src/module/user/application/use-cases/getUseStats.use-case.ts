import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from 'src/module/user/domaine/repository/repositoryInterface';

@Injectable()
export class GetUserStatsUseCase {
  constructor(
      @Inject('USER_REPOSITORY') private userRepository: UserRepositoryInterface,
    ) {}
  async execute(userId: string) {
    // return this.userService.getUserStats(userId);
  }
}
