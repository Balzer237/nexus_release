import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/module/user/domaine/entities/userEntity';
import { UserRepositoryInterface } from 'src/module/user/domaine/repository/repositoryInterface';

@Injectable()
export class GetFollowingUserUseCase {
  constructor(
      @Inject('USER_REPOSITORY') private userRepository: UserRepositoryInterface,
    ) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    const followers: UserEntity[] = await this.userRepository.getFollowingUser(
      user.id,
    );
    return followers;
  }
}
