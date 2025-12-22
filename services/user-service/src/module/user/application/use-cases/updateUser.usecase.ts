import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/module/user/domaine/entities/userEntity';
import { UserRepositoryInterface } from 'src/module/user/domaine/repository/repositoryInterface';
import { UserMapper } from '../../infrastructure/mapper/userMapper';

@Injectable()
export class UpdateUserUseCase {
  constructor(
      @Inject('USER_REPOSITORY') private userRepository: UserRepositoryInterface,
    ) {}

  async execute(userId: string, updateData: UserEntity) {
    await this.userRepository.findById(userId);

    return this.userRepository.save(UserMapper.entityToDocument(updateData));
  }
}
