import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from 'src/module/user/domaine/repository/repositoryInterface';
import { UserMapper } from '../../infrastructure/mapper/userMapper';

@Injectable()
export class AddSkillsUseCase {
  constructor(
      @Inject('USER_REPOSITORY') private userRepository: UserRepositoryInterface,
    ) {}

  async execute(userId: string, skill: string) {
    const user = await this.userRepository.findById(userId);
    user.setSkill(skill);
    return this.userRepository.save(UserMapper.entityToDocument(user));
  }
}
