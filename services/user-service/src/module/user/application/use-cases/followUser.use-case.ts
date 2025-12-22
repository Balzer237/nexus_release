import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { userRelationshipEntity } from 'src/module/user/domaine/entities/user-relationship';
import { StateUser } from 'src/module/user/domaine/entities/userEntity';
import { UserRepositoryInterface } from 'src/module/user/domaine/repository/repositoryInterface';
import { UserMapper } from '../../infrastructure/mapper/userMapper';

@Injectable()
export class followAnotherUser {
  constructor(
      @Inject('USER_REPOSITORY') private userRepository: UserRepositoryInterface,
    ) {}

  async execute(currentUserId: string, userToFollowId: string) {
    const [userToFollow, currentUser] = await Promise.all([
      this.userRepository.findById(userToFollowId),
      this.userRepository.findById(currentUserId),
    ]);
    const isActive = userToFollow.getState() === StateUser.ACTIVE;
    const isCurrentUserActive = currentUser.getState() === StateUser.ACTIVE;

    if (!isCurrentUserActive) {
      throw new Error('Current user must be active to follow someone');
    }
    if (!isActive) {
      throw new Error('Cannot follow an inactive or suspended user');
    }
    const allreadyFollow:  userRelationshipEntity =
      await this.userRepository.findRelation(currentUserId, userToFollowId);

    if (allreadyFollow) {
      throw new ConflictException('you already follow this user');
    }

    const relationship = await this.userRepository.createRelationship({
      follower: currentUserId,
      following: userToFollowId,
    });
    userToFollow.setFollowerCount(1);
    currentUser.setFollowingCount(1);
    await Promise.all([
      await this.userRepository.save(UserMapper.entityToDocument(userToFollow)),
      await this.userRepository.save(UserMapper.entityToDocument(currentUser)),
    ]);

    return relationship;
  }
}
