import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { userRelationshipEntity } from 'src/module/user/domaine/entities/user-relationship';
import { StateUser } from 'src/module/user/domaine/entities/userEntity';
import { UserRepositoryInterface } from 'src/module/user/domaine/repository/repositoryInterface';
import { UserMapper } from '../../infrastructure/mapper/userMapper';

@Injectable()
export class unFollowUser {
  constructor(
      @Inject('USER_REPOSITORY') private userRepository: UserRepositoryInterface,
    ) {}

  async execute(currentUserId: string, userToUnfollowId: string) {
    const [currentUser, userToFollow] = await Promise.all([
      this.userRepository.findById(currentUserId),
      this.userRepository.findById(userToUnfollowId),
    ]);

    const isCurrentUserActive = currentUser.getState() === StateUser.ACTIVE; // verifis si l'utilisateur cibleur est actif

    if (!isCurrentUserActive) {
      throw new Error('Current user must be active to unfollow someone');
    }
    const relation: userRelationshipEntity =
      await this.userRepository.findRelation(currentUserId, userToUnfollowId);

    if (!relation) throw new NotFoundException("you don't follow this user");

    console.log('la relation', relation);
    userToFollow.setFollowerCount(-1);
    currentUser.setFollowingCount(-1);
    console.log('afterupdate');
    await this.userRepository.deleteRelationship(relation.id);
    console.log('delete');
    await Promise.all([
      await this.userRepository.save(UserMapper.entityToDocument(userToFollow)),
      await this.userRepository.save(UserMapper.entityToDocument(currentUser)),
    ]);
    console.log('promise');

    return { message: 'sucess' };
  }
}
