import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../../domaine/repository/repositoryInterface';
import { UserMapper } from '../../infrastructure/mapper/userMapper';

@Injectable()
export class AddPointsUseCase {
  constructor(
        @Inject('USER_REPOSITORY') private userRepository: UserRepositoryInterface,
      ) {}

  async execute(userId: string, points: number) {
    const user = await this.userRepository.findById(userId);
    user.updateReputationScore(points);
    const userDocument: any = UserMapper.entityToDocument(user);
    return this.userRepository.save(userDocument);
  }
}
