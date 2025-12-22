import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { FindAllUsersUseCase } from '../../application/use-cases/findAllUser.use-case';
import { AddSkillsUseCase } from '../../application/use-cases/addSkills.use-case';
import { CreateUserUseCase } from '../../application/use-cases/createUser.use-case';
import { AddPointsUseCase } from '../../application/use-cases/addPoints.use-case';
import { UpdateProfileUseCase } from '../../application/use-cases/updateProfile.use-case';
import { FindByEmailUseCase } from '../../application/use-cases/findByEmail.use-case';
import { FindUserByIdUseCase } from '../../application/use-cases/findUserById.use-case';
import { followAnotherUser } from '../../application/use-cases/followUser.use-case';
import { unFollowUser } from '../../application/use-cases/unFollowUser.user-case';
import { GetFollowerUserUseCase } from '../../application/use-cases/getFollowerUser.use-case';
import { GetFollowingUserUseCase } from '../../application/use-cases/getFollowingUser.use-case';
import { GetUserStatsUseCase } from '../../application/use-cases/getUseStats.use-case';
import { RemovePointsUseCase } from '../../application/use-cases/removePoints.use-case';
import { RemoveSkillsUseCase } from '../../application/use-cases/removeSkillls.use-case';
import { SuspendUserUseCase } from '../../application/use-cases/suspendUser.use-case';
import { UnSuspendUserUseCase } from '../../application/use-cases/unSuspendUser.use-case';
import { UpdateAvatarUseCase } from '../../application/use-cases/updateAvatard.use-case';
import { UpdatePasswordUseCase } from '../../application/use-cases/updatePassword.use-case';
import { filterUserDto } from '../dto/entrant/getUserDto';
import { UserMapper } from '../../infrastructure/mapper/userMapper';
import { CreateUserDto } from '../dto/entrant/create-user-dto';

@Controller()
export class UsersController {
  constructor(
    private readonly FindAllUsersUseCase: FindAllUsersUseCase,
    private readonly addSkillsUseCase: AddSkillsUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly addPointsUseCase: AddPointsUseCase,
    private readonly updateProfileUseCase: UpdateProfileUseCase,
    private readonly FindByEmailUseCase: FindByEmailUseCase,
    private readonly FindUserByIdUseCase: FindUserByIdUseCase,
    private readonly followAnotherUser: followAnotherUser,
    private readonly unfollowUserUseCase: unFollowUser,
    private readonly GetFollowerUserUseCase: GetFollowerUserUseCase,
    private readonly GetFollowingUserUseCase: GetFollowingUserUseCase,
    private readonly getUserStatsUseCase: GetUserStatsUseCase,
    private readonly removePointsUseCase: RemovePointsUseCase,
    private readonly removeSkillsUseCase: RemoveSkillsUseCase,
    private readonly suspendUserUseCase: SuspendUserUseCase,
    private readonly unSuspendUserUseCase: UnSuspendUserUseCase,
    private readonly updateAvatarUseCase: UpdateAvatarUseCase,
    private readonly updatePasswordUseCase: UpdatePasswordUseCase,
  ) {}


  /* ------------------------------------------------------------------
   * Users
   * ------------------------------------------------------------------ */

  @Get('/users')
  async findAllUsers(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('query') query?: string | number,
  ) {
    console.log('jentre',page,'limit',limit,'query',query)
    const filter: filterUserDto = {
      value: query && query,
      meta: {
        current_page: page,
        limit: limit,
      },
    };
    const users = await this.FindAllUsersUseCase.execute(filter);
    const data =users.users.map((r) => UserMapper.userEntityToEntitySortant(r));
    console.log('je suis la data user de retour',data);
    return data;
    }

  @Get('/users/:id')
  async getUserById(@Param('id') id: string) {
    console.log('il est ici', id);
    const response = await this.FindUserByIdUseCase.execute(id);    
    return  UserMapper.userEntityToEntitySortant(response);
  }

  @Get('/users/:id/stats')
  async getUserStats(@Param('id') id: string, @Req() req?: any) {
    return await this.getUserStatsUseCase.execute(id);
  
    }

  @Get('/users/:id/followers')
  async getFollowers(@Param('id') id: string, @Req() req?: any) {
   
    const response = await this.GetFollowerUserUseCase.execute(id);
    console.log('la response des followers', response);
    return response.map((r) => UserMapper.userEntityToEntitySortant(r));
  
    }

  @Get('/users/:id/followings')
  async getFollowings(@Param('id') id: string) {
   
    const response = await this.GetFollowingUserUseCase.execute(id);
    return response.map((r) => UserMapper.userEntityToEntitySortant(r));
     }

  @Post('/users/id/follow/:targetId')
  async followUser(
    @Param('targetId') targetId: string,
    @Param('is') id:string
  ) {
    const response = await this.followAnotherUser.execute(
     id,
      targetId,
    );
    return response;
    }

  @Post('/users/:id/unfollow/:targetId')
  unfollowUser(
    @Param('id') id: string,
    @Param('targetId') targetId: string,
  ) {
    return this.unfollowUserUseCase.execute(
      id,
      targetId,
    );
    }

  @Post('/users')
  async createUser(@Body() createUserDto: CreateUserDto) {
     const response = await this.createUserUseCase.execute(createUserDto);
    return UserMapper.userEntityToEntitySortant(response);
      
    }

  @Put('/users/:id')
  updateProfile(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req?: any,
  ) {
    }

  @Put('/users/:id/points')
  addPoints(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req?: any,
  ) {
     }

  @Put('/users/:id/skills')
  addSkills(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req?: any,
  ) {
     }

  @Put('/users/:id/suspend')
  suspendUser(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req?: any,
  ) {
     }

  @Put('/users/:id/unsuspend')
  unsuspendUser(@Param('id') id: string, @Req() req?: any) {
     }

  @Patch('/users/:id/avatar')
  updateAvatar(@Param('id') id: string, @Req() req?: any) {
    }

  @Put('/users/:id/password')
  updatePassword(@Param('id') id: string, @Body() body: any, @Req() req?: any) {
    }

  @Put('/users/:id/remove-points')
  removePoints(@Param('id') id: string, @Body() body: any, @Req() req?: any) {
    }

  @Put('/users/:id/remove-skills')
  removeSkills(@Param('id') id: string, @Body() body: any, @Req() req?: any) {
    }
}
