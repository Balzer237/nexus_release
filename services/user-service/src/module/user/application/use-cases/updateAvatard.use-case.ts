import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindUserByIdUseCase } from './findUserById.use-case';
import { UserRepositoryInterface } from 'src/module/user/domaine/repository/repositoryInterface';
import { MediaType } from 'src/lib/type/mediaType';
import { UserEntity } from 'src/module/user/domaine/entities/userEntity';
import { UserMapper } from '../../infrastructure/mapper/userMapper';

@Injectable()
export class UpdateAvatarUseCase {
  constructor(
   
       @Inject('USER_REPOSITORY') private userRepository: UserRepositoryInterface,
     
    private readonly findUserById: FindUserByIdUseCase,
  ) {}
  async execute(id: string, data: MediaType) {
    const user = await this.findUserById.execute(id);
    if (!user) throw new NotFoundException('User not found');
    //if (user.id != 'userconnecter')
    //throw new UnauthorizedException('Only owner can update profif');
    user.setAVatarUrl(data);
    const finaldata: UserEntity = await this.userRepository.save(
      UserMapper.entityToDocument(user),
    );
    return finaldata;
  }
}
