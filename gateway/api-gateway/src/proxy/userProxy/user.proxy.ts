import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { forward } from 'lib/requetForwar';
import { CreateUserDto } from './dto/create-user-dto';
import { AddSkillsDto } from './dto/addSkill';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { AddSPointsDto } from './dto/addPoint';
import { UpdateUserDto } from './dto/update-user-dto';
import { coreResponse } from 'lib/responceStructure';

@ApiBearerAuth()
@Controller()
export class UsersProxyController {
  constructor(private readonly http: HttpService) {}


  /* ------------------------------------------------------------------
   * Users
   * ------------------------------------------------------------------ */

  @Get('/users')
  @ApiQuery({ name: 'page', required: true })
  @ApiQuery({ name: 'limit', required: true })
  @ApiQuery({ name: 'query', required: false })
  async findAllUsers(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('query') query?: string | number,
    @Req() req?: any,
  ) {
    console.log('jentre 1',page,'limit',limit,'query',query)
    const users= await forward(this.http,'user_service','get', '/users', req, null, { page, limit, query });
     console.log('je suis la data recu dans la gateway',users);
    return  coreResponse({
      data: users,
      meta: {
        page: users.page,
        limit: users.limit,
        total: users.total,
        totalPages: users.totalPages,
      },
    });
  }

  @Get('/users/:id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifiant unique de l’utilisateur',
    example: 'a3f1c2e4-7b9d-4c8a-9e12-123456789abc',
  })
  async getUserById(@Param('id') id: string, @Req() req?: any) {

    const user= await forward(this.http,'user_service', 'get', `/users/${id}`, req);
    return coreResponse({
      data:user
    })
   
  }


  @Get('/users/me')
  async getMe(@Req() req?: any) {
     const user= await forward(this.http,'user_service', 'get', `/users/${req.user.id}`, req);
     console.log('je suis id',req.user.id)
    return coreResponse({
      data:user
    })
  }

  @Get('/users/stats')
  getUserStats(@Req() req?: any) {
    return forward(this.http,'user_service','get', `/users/${req.user.id}/stats`, req);
  }

  @Get('/users/followers')
  async getFollowers( @Req() req?: any) {
    const data=await forward(this.http,'user_service','get', `/users/${req.user.id}/followers`, req);
    return coreResponse({
      data:data
    })
  }

  @Get('/users/followings')
  async getFollowings( @Req() req?: any) {
    const data=await forward(this.http,'user_service','get', `/users/${req.user.id}/followings`, req);
    return coreResponse({
      data:data
    })
  }

  @Post('/users/follow/:targetId')
  async followUser(
    @Param('targetId') targetId: string,
    @Req() req?: any,
  ) {
    const response=await forward(this.http,'user_service','post', `/users/${req.user.id}/follow/${targetId}`, req,{userId:req.user.id});
    return coreResponse({
      data: response,
      status: HttpStatus.ACCEPTED,
    });
  }

  @Post('/users/unfollow/:targetId')
  async unfollowUser(
    @Param('targetId') targetId: string,
    @Req() req?: any,
  ) {
    const response= await forward(this.http,'user_service','post', `/users/${req.user.id}/unfollow/${targetId}`, req);
    return coreResponse({
      data: response,
      status: HttpStatus.ACCEPTED,
    });
  }

  @Post('/users')
  async createUser(@Body() body: CreateUserDto) {
    const data=await forward(this.http,'user_service','post', '/users', null, body);
    return coreResponse({
      data: data,
      status: HttpStatus.CREATED,
    });
  }

  @Put('/users')
  updateProfile(
    @Body() body: UpdateUserDto,
    @Req() req?: any,
  ) {
    return forward(this.http,'user_service','put', `/users/${req.user.id}`, req, body);
  }

  @Put('/users/:id/points')
  addPoints(
    @Param('id') id: string,
    @Body() body: AddSPointsDto,
    @Req() req?: any,
  ) {
    return forward(this.http,'user_service','put', `/users/${id}/points`, req, body);
  }

  @Put('/users/skills')
  addSkills(
    @Body() body: AddSkillsDto,
    @Req() req?: any,
  ) {
    return forward(this.http,'user_service','put', `/users/${req.user.id}/skills`, req, body);
  }

  @Put('/users/:id/suspend')
  suspendUser(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req?: any,
  ) {
    return forward(this.http,'user_service','put', `/users/${id}/suspend`, req, body);
  }

  @Put('/users/:id/unsuspend')
  unsuspendUser(@Param('id') id: string, @Req() req?: any) {
    return forward(this.http,'user_service','put', `/users/${id}/unsuspend`, req);
  }

  @Patch('/users/avatar')
  updateAvatar(@Req() req?: any) {
    return forward(this.http,'user_service','patch', `/users/${req.user.id}/avatar`, req);
  }

  @Put('/users/password')
  updatePassword(@Body() body: UpdatePasswordDto, @Req() req?: any) {
    return forward(this.http,'user_service','put', `/users/${req.user.id}/password`, req, body);
  }

  @Put('/users/:id/remove-points')
  removePoints(@Param('id') id: string, @Body() body: any, @Req() req?: any) {
    return forward(this.http,'user_service','put', `/users/${id}/remove-points`, req, body);
  }

  @Put('/users/:id/remove-skills')
  removeSkills(@Param('id') id: string, @Body() body: any, @Req() req?: any) {
    return forward(this.http,'user_service','put', `/users/${id}/remove-skills`, req, body);
  }
}
