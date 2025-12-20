import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApiBearerAuth } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

@ApiBearerAuth()
@Controller()
export class ProjectsProxyController {
  constructor(private readonly http: HttpService) {}


  private forward(
    method: 'get' | 'post' | 'patch' | 'delete',
    url: string,
    req: any,
    data?: any,
    params?: any,
  ) {
    return firstValueFrom(
      this.http.request({
        method,
        url: `http://project_service:3000${url}`,
        data,
        params,
        headers: {
          Authorization: req.headers.authorization,
        },
      }),
    ).then(res => res.data);
  }

  /* ------------------------------------------------------------------
   * Projects
   * ------------------------------------------------------------------ */

  @Post('/projects')
  createProject(@Body() body: any, @Req() req: any) {
    return this.forward('post', '/projects', req, body);
  }

  @Get('/projects/:projectId')
  getProjectById(@Param('projectId') projectId: string, @Req() req: any) {
    return this.forward('get', `/projects/${projectId}`, req);
  }

  @Patch('/projects/:projectId')
  updateProject(
    @Param('projectId') projectId: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.forward('patch', `/projects/${projectId}`, req, body);
  }

  @Delete('/projects/:projectId')
  deleteProject(@Param('projectId') projectId: string, @Req() req: any) {
    return this.forward('delete', `/projects/${projectId}`, req);
  }

  @Patch('/projects/:projectId/visibility')
  setProjectVisibility(
    @Param('projectId') projectId: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.forward(
      'patch',
      `/projects/${projectId}/visibility`,
      req,
      body,
    );
  }

  @Patch('/projects/:projectId/status')
  setProjectStatus(
    @Param('projectId') projectId: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.forward(
      'patch',
      `/projects/${projectId}/status`,
      req,
      body,
    );
  }

  /* ------------------------------------------------------------------
   * Chapters
   * ------------------------------------------------------------------ */

  @Post('/projects/:projectId/chapters')
  createChapter(
    @Param('projectId') projectId: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.forward(
      'post',
      `/projects/${projectId}/chapters`,
      req,
      body,
    );
  }

  @Get('/chapters/:chapterId')
  getChapter(@Param('chapterId') chapterId: string, @Req() req: any) {
    return this.forward('get', `/chapters/${chapterId}`, req);
  }

  @Patch('/chapters/:chapterId')
  updateChapter(
    @Param('chapterId') chapterId: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.forward(
      'patch',
      `/chapters/${chapterId}`,
      req,
      body,
    );
  }

  @Patch('/chapters/:chapterId/publish')
  publishChapter(
    @Param('chapterId') chapterId: string,
    @Req() req: any,
  ) {
    return this.forward(
      'patch',
      `/chapters/${chapterId}/publish`,
      req,
    );
  }

  @Delete('/chapters/:chapterId')
  deleteChapter(
    @Param('chapterId') chapterId: string,
    @Req() req: any,
  ) {
    return this.forward('delete', `/chapters/${chapterId}`, req);
  }

  @Get('/chapters/:chapterId/media')
  getChapterMedia(
    @Param('chapterId') chapterId: string,
    @Req() req: any,
  ) {
    return this.forward(
      'get',
      `/chapters/${chapterId}/media`,
      req,
    );
  }

  /* ------------------------------------------------------------------
   * Media
   * ------------------------------------------------------------------ */

  @Get('/media/:mediaId')
  getMediaById(@Param('mediaId') mediaId: string, @Req() req: any) {
    return this.forward('get', `/media/${mediaId}`, req);
  }

  @Get('/users/:userId/media')
  getUserMedia(
    @Param('userId') userId: string,
    @Req() req: any,
  ) {
    return this.forward('get', `/users/${userId}/media`, req);
  }

  @Delete('/media/:mediaId')
  deleteMedia(
    @Param('mediaId') mediaId: string,
    @Req() req: any,
  ) {
    return this.forward('delete', `/media/${mediaId}`, req);
  }

  /* ------------------------------------------------------------------
   * Comments
   * ------------------------------------------------------------------ */

  @Post('/projects/:projectId/comments')
  createComment(
    @Param('projectId') projectId: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.forward(
      'post',
      `/projects/${projectId}/comments`,
      req,
      body,
    );
  }

  @Get('/projects/:projectId/comments')
  getProjectComments(
    @Param('projectId') projectId: string,
    @Query('type') type: number,
    @Req() req: any,
  ) {
    return this.forward(
      'get',
      `/projects/${projectId}/comments`,
      req,
      undefined,
      { type },
    );
  }

  @Patch('/comments/:commentId')
  updateComment(
    @Param('commentId') commentId: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.forward(
      'patch',
      `/comments/${commentId}`,
      req,
      body,
    );
  }

  @Patch('/comments/:commentId/response')
  markCommentAsResponse(
    @Param('commentId') commentId: string,
    @Req() req: any,
  ) {
    return this.forward(
      'patch',
      `/comments/${commentId}/response`,
      req,
    );
  }

  @Post('/comments/:commentId/likes')
  likeComment(
    @Param('commentId') commentId: string,
    @Req() req: any,
  ) {
    return this.forward(
      'post',
      `/comments/${commentId}/likes`,
      req,
    );
  }

  @Delete('/comments/:commentId')
  deleteComment(
    @Param('commentId') commentId: string,
    @Req() req: any,
  ) {
    return this.forward(
      'delete',
      `/comments/${commentId}`,
      req,
    );
  }

  /* ------------------------------------------------------------------
   * Collaborations
   * ------------------------------------------------------------------ */

  @Post('/projects/:projectId/collaborations')
  createCollaboration(
    @Param('projectId') projectId: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.forward(
      'post',
      `/projects/${projectId}/collaborations`,
      req,
      body,
    );
  }

  @Get('/projects/:projectId/collaborations')
  getProjectCollaborations(
    @Param('projectId') projectId: string,
    @Req() req: any,
  ) {
    return this.forward(
      'get',
      `/projects/${projectId}/collaborations`,
      req,
    );
  }

  @Get('/users/:userId/collaborations')
  getUserCollaborations(
    @Param('userId') userId: string,
    @Req() req: any,
  ) {
    return this.forward(
      'get',
      `/users/${userId}/collaborations`,
      req,
    );
  }

  @Patch('/collaborations/:collaborationId/status')
  changeCollaborationStatus(
    @Param('collaborationId') collaborationId: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.forward(
      'patch',
      `/collaborations/${collaborationId}/status`,
      req,
      body,
    );
  }

  @Delete('/collaborations/:collaborationId')
  deleteCollaboration(
    @Param('collaborationId') collaborationId: string,
    @Req() req: any,
  ) {
    return this.forward(
      'delete',
      `/collaborations/${collaborationId}`,
      req,
    );
  }
}
