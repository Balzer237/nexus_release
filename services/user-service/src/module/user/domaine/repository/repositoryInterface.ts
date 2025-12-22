
import { CreateUserDto } from 'src/module/user/adapter/dto/entrant/create-user-dto';
import { UserEntity } from '../entities/userEntity';
import { filterUserDto } from 'src/module/user/adapter/dto/entrant/getUserDto';

export abstract class UserRepositoryInterface {
  abstract create(createUserDto: CreateUserDto): Promise<UserEntity>;
  abstract findAll(meta: filterUserDto): Promise<any>;
  abstract findById(id: string): Promise<UserEntity>;
  abstract findManyById(id: string[]): Promise<UserEntity[]>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract delete(id: string): Promise<void>;
  abstract softDelete(id: string): Promise<void>;
  abstract save(user: any): Promise<any>;
  abstract createRelationship(data: any): Promise<any>;
  abstract deleteRelationship(id);
  abstract getFollowerUser(userId): Promise<UserEntity[]>;
  abstract getFollowingUser(userID): Promise<UserEntity[]>;
  abstract findRelation(currentUserId, userToFollowId);
}
