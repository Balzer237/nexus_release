import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from 'src/module/user/domaine/repository/repositoryInterface';
import { UserMapper } from '../../infrastructure/mapper/userMapper';

@Injectable()
export class RemoveSkillsUseCase {
 constructor(
     @Inject('USER_REPOSITORY') private userRepository: UserRepositoryInterface,
   ) {}

  async execute(userId: string, skills: string) {
    const user = await this.userRepository.findById(userId);
    user.setSkill(skills, false);
    const userDoc = UserMapper.entityToDocument(user);
    return this.userRepository.save(userDoc);
  }
}
