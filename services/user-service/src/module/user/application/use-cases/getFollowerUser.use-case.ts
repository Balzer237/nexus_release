import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/module/user/domaine/entities/userEntity';
import { UserRepositoryInterface } from 'src/module/user/domaine/repository/repositoryInterface';

@Injectable()
export class GetFollowerUserUseCase {
  constructor(
      @Inject('USER_REPOSITORY') private userRepository: UserRepositoryInterface,
    ) {}
  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('user Not found');

    const followers: UserEntity[] =
      await this.userRepository.getFollowerUser(userId);
    return followers;
  }
}
