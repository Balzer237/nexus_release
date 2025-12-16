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
import { HttpService } from '@nestjs/axios';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { forward } from 'lib/requetForwar';

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
  findAllUsers(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('query') query?: string | number,
    @Req() req?: any,
  ) {
    return forward('user_service','get', '/users', req, null, { page, limit, query });
  }

  @Get('/users/:id')
  getUserById(@Param('id') id: string, @Req() req?: any) {
    return forward('user_service','get', `/users/${id}`, req);
  }

  @Get('/users/:id/stats')
  getUserStats(@Param('id') id: string, @Req() req?: any) {
    return forward('user_service','get', `/users/${id}/stats`, req);
  }

  @Get('/users/:id/followers')
  getFollowers(@Param('id') id: string, @Req() req?: any) {
    return forward('user_service','get', `/users/${id}/followers`, req);
  }

  @Get('/users/:id/followings')
  getFollowings(@Param('id') id: string, @Req() req?: any) {
    return forward('user_service','get', `/users/${id}/followings`, req);
  }

  @Post('/users/:id/follow/:targetId')
  followUser(
    @Param('id') id: string,
    @Param('targetId') targetId: string,
    @Req() req?: any,
  ) {
    return forward('user_service','post', `/users/${id}/follow/${targetId}`, req);
  }

  @Post('/users/:id/unfollow/:targetId')
  unfollowUser(
    @Param('id') id: string,
    @Param('targetId') targetId: string,
    @Req() req?: any,
  ) {
    return forward('user_service','post', `/users/${id}/unfollow/${targetId}`, req);
  }

  @Post('/users')
  createUser(@Body() body: any) {
    return forward('user_service','post', '/users', null, body);
  }

  @Put('/users/:id')
  updateProfile(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req?: any,
  ) {
    return forward('user_service','put', `/users/${id}`, req, body);
  }

  @Put('/users/:id/points')
  addPoints(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req?: any,
  ) {
    return forward('user_service','put', `/users/${id}/points`, req, body);
  }

  @Put('/users/:id/skills')
  addSkills(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req?: any,
  ) {
    return forward('user_service','put', `/users/${id}/skills`, req, body);
  }

  @Put('/users/:id/suspend')
  suspendUser(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req?: any,
  ) {
    return forward('user_service','put', `/users/${id}/suspend`, req, body);
  }

  @Put('/users/:id/unsuspend')
  unsuspendUser(@Param('id') id: string, @Req() req?: any) {
    return forward('user_service','put', `/users/${id}/unsuspend`, req);
  }

  @Patch('/users/:id/avatar')
  updateAvatar(@Param('id') id: string, @Req() req?: any) {
    return forward('user_service','patch', `/users/${id}/avatar`, req);
  }

  @Put('/users/:id/password')
  updatePassword(@Param('id') id: string, @Body() body: any, @Req() req?: any) {
    return forward('user_service','put', `/users/${id}/password`, req, body);
  }

  @Put('/users/:id/remove-points')
  removePoints(@Param('id') id: string, @Body() body: any, @Req() req?: any) {
    return forward('user_service','put', `/users/${id}/remove-points`, req, body);
  }

  @Put('/users/:id/remove-skills')
  removeSkills(@Param('id') id: string, @Body() body: any, @Req() req?: any) {
    return forward('user_service','put', `/users/${id}/remove-skills`, req, body);
  }
}
