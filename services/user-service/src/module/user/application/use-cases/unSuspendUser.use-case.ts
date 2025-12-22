import { Inject, Injectable } from '@nestjs/common';
import { StateUser } from 'src/module/user/domaine/entities/userEntity';
import { UserRepositoryInterface } from 'src/module/user/domaine/repository/repositoryInterface';
import { UserMapper } from '../../infrastructure/mapper/userMapper';

@Injectable()
export class UnSuspendUserUseCase {
  constructor(
      @Inject('USER_REPOSITORY') private userRepository: UserRepositoryInterface,
    ) {}
  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    user.setState(StateUser.ACTIVE);
    return this.userRepository.save(UserMapper.entityToDocument(user));
  }
}
