import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bycript from 'bcrypt';
import { UpdatePasswordDto } from 'src/module/user/adapter/dto/entrant/updatePassword.dto';
import { UserRepositoryInterface } from 'src/module/user/domaine/repository/repositoryInterface';
import { UserMapper } from '../../infrastructure/mapper/userMapper';
@Injectable()
export class UpdatePasswordUseCase {
 constructor(
     @Inject('USER_REPOSITORY') private userRepository: UserRepositoryInterface,
   ) {}
  async execute(userId: string, data: UpdatePasswordDto) {
    const user = await this.userRepository.findById(userId);
    if (!user)
      throw new NotFoundException("this user doesn't exist or disable account");

    const comparePassord = await bycript.compare(data.allPassword,user.getPassword());
    if (!comparePassord) {
      throw new NotFoundException("the allpassword doesn't match ");
    }
    const hashedPassword: string = await bycript.hash(data.newPassword, 10);

    user.setPassword(hashedPassword);
    return await this.userRepository.save(UserMapper.entityToDocument(user));
  }
}
