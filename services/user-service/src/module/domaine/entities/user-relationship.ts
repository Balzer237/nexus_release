import { UserEntity } from './userEntity';

export class userRelationshipEntity {
  id: string;
  private follower: UserEntity;
  private following: UserEntity;
  createAt: Date;
  updateAt: Date;

  constructor(id: string, follower: UserEntity, following: UserEntity) {
    this.id = id;
    this.follower = follower;
    this.following = following;
  }

  getFllower() {
    return this.follower;
  }
  getFllowing() {
    return this.following;
  }
}
