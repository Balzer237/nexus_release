import { Inject, Injectable } from '@nestjs/common';
import { StateUser } from 'src/module/user/domaine/entities/userEntity';
import { UserRepositoryInterface } from 'src/module/user/domaine/repository/repositoryInterface';
import { UserMapper } from '../../infrastructure/mapper/userMapper';

@Injectable()
export class SuspendUserUseCase {
  constructor(
      @Inject('USER_REPOSITORY') private userRepository: UserRepositoryInterface,
    ) {}

  async execute(id: string, reason: string, duration?: number) {
    console.log('la', id);
    const user = await this.userRepository.findById(id);
    console.log('user', user);
    user.setState(StateUser.INACTIVE);
    console.log('after', user);
    return this.userRepository.save(UserMapper.entityToDocument(user));
  }
}
