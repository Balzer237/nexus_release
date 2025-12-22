import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/module/user/adapter/dto/entrant/create-user-dto';
import { UserEntity } from 'src/module/user/domaine/entities/userEntity';
import { UserRepositoryInterface } from 'src/module/user/domaine/repository/repositoryInterface';
import { UserMapper } from '../../infrastructure/mapper/userMapper';

@Injectable()
export class UpdateProfileUseCase {
 constructor(
     @Inject('USER_REPOSITORY') private userRepository: UserRepositoryInterface,
   ) {}

  async execute(userId: string, updateData: CreateUserDto | UserEntity) {
    const user: UserEntity = await this.userRepository.findById(userId);
    user.username = updateData.username;
    user.email = updateData.email;
    user.setPassword(updateData.password);
    user.bio = updateData.bio ? updateData.bio : undefined;
    //user.setSkill(updateData.skills)

    return this.userRepository.save(UserMapper.entityToDocument(user));
  }
}
