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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApiBearerAuth } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { CreateProjectDto } from './dto/create-project-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProjectDTo } from './dto/updateProject.dto';
import { SetVisibilityProjectDto } from './dto/setVisibilityDto';
import { CreateChapterDto } from './dto/createChapter-dto';
import { UpdateChapterDTo } from './dto/updateChapter.dto';
import { CreateCommentDto } from './dto/createCommentDto';
import { UpdateCommentDTO } from './dto/updateComment.dto';
import { MarckCommentAsResponseDto } from './dto/marckCommentAsSolution.dto';
import { LikeDto } from './dto/like.dto';
import { createCollaborationDto } from './dto/createCollaborationDto';
import { CreateMediaDto } from './dto/createMedia.dto';

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
  createProject(@Body() body: CreateProjectDto, @Req() req: any) {
    return this.forward('post', '/projects', req, body);
  }

  @Get('/universities/:universityId/projects')
  getAllProjectsByUniversity(
    @Param('universityId') universityId: string, 
    @Req() req: any
  ) {
    return this.forward('get', `/universities/${universityId}/user/${req.user.id}/projects`, req);
  }

  @Get('participants/:participantId/projects')
  getAllProjectsByParticipant(
    @Param('universityId') universityId: string,
    @Param('participantId') participantId: string, 
    @Req() req: any
  ) {
    return this.forward(
      'get', 
      `/participants/${participantId}/projects`, 
      req
    );
  }

  @Get('/projects/:projectId')
  getProjectById(@Param('projectId') projectId: string, @Req() req: any) {
    return this.forward('get', `/projects/${projectId}`, req);
  }

  @Patch('/projects/:projectId')
  updateProject(
    @Param('projectId') projectId: string,
    @Body() body: UpdateProjectDTo,
    @Req() req: any,
  ) {
    return this.forward('patch', `/projects/${projectId}`, req, body);
  }


  @Delete('/projects/:projectId')
  deleteProject(
    @Param('projectId') projectId: string, 
    @Query('participantId') participantId: string,
    @Req() req: any
  ) {
    return this.forward('delete', `/projects/${projectId}`, req, undefined, { participantId });
  }

  @Patch('/projects/:projectId/visibility')
  setProjectVisibility(
    @Param('projectId') projectId: string,
    @Body() body: SetVisibilityProjectDto,
    @Req() req: any,
  ) {
    const finalPayload={
      ...body,
      ownerId:1
      //ici ajouter le proprietaire du projet
    }
    return this.forward(
      'patch',
      `/projects/${projectId}/visibility`,
      req,
      finalPayload,
    );
  }

  @Patch('/projects/:projectId/status')
  setProjectStatus(
    @Param('projectId') projectId: string,
    @Body() body: any,
    @Req() req: any,
  ) {
     const finalPayload={
      ...body,
      ownerId:1
      //ici ajouter le proprietaire du projet
    }
    return this.forward(
      'patch',
      `/projects/${projectId}/status`,
      req,
      finalPayload,
    );
  }

  @Patch('/projects/:projectId/logo')
  @UseInterceptors(FileInterceptor('file'))
  updateProjectLogo(
    @Param('projectId') projectId: string,
    @UploadedFile() file: any,
    @Body() body: any,
    @Req() req: any,
  ) {
    const formData = new FormData();
    if (file) {
      formData.append('file', file.buffer, file.originalname);
    }
    Object.keys(body).forEach(key => {
      formData.append(key, body[key]);
    });
    
    return this.forward(
      'patch',
      `/projects/${projectId}/logo`,
      req,
      formData,
    );
  }

  /* ------------------------------------------------------------------
   * Chapters
   * ------------------------------------------------------------------ */

  @Post('/projects/:projectId/chapters')
  createChapter(
    @Param('projectId') projectId: string,
    @Body() body: CreateChapterDto,
    @Req() req: any,
  ) {
    return this.forward(
      'post',
      `/projects/${projectId}/chapters`,
      req,
      body,
    );
  }

  @Get('/projects/:projectId/chapters')
  getProjectChapters(
    @Param('projectId') projectId: string,
    @Query('userId') userId: string,
    @Req() req: any,
  ) {
    return this.forward(
      'get',
      `/projects/${projectId}/chapters`,
      req,
      undefined,
      { userId },
    );
  }

  @Get('/chapters/:chapterId')
  getChapter(@Param('chapterId') chapterId: string, @Req() req: any) {
    return this.forward('get', `/chapters/${chapterId}`, req);
  }

  @Patch('/chapters/:chapterId')
  updateChapter(
    @Param('chapterId') chapterId: string,
    @Body() body: UpdateChapterDTo,
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
    @Query('participantId') participantId: string,
    @Req() req: any,
  ) {
    return this.forward(
      'patch',
      `/chapters/${chapterId}/publish`,
      req,
      undefined,
      { participantId },
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

  @Post('/chapters/:chapterId/media')
  @UseInterceptors(FileInterceptor('file'))
  createMedia(
    @Param('chapterId') chapterId: string,
    @UploadedFile() file: any,
    @Body() body: CreateMediaDto,
    @Req() req: any,
  ) {
    const formData = new FormData();
    if (file) {
      formData.append('file', file.buffer, file.originalname);
    }
    Object.keys(body).forEach(key => {
      formData.append(key, body[key]);
    });
    
    return this.forward(
      'post',
      `/chapters/${chapterId}/media`,
      req,
      formData,
    );
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
    @Body() body: CreateCommentDto,
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
    @Query('participantId') participantId: string,
    @Req() req: any,
  ) {
    return this.forward(
      'get',
      `/projects/${projectId}/comments`,
      req,
      undefined,
      { type, participantId },
    );
  }

  @Patch('/comments/:commentId')
  updateComment(
    @Param('commentId') commentId: string,
    @Body() body: UpdateCommentDTO,
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
    @Body() body: MarckCommentAsResponseDto,
    @Req() req: any,
  ) {
    return this.forward(
      'patch',
      `/comments/${commentId}/response`,
      req,
      body
    );
  }

  @Post('/comments/:commentId/likes')
  likeComment(
    @Param('commentId') commentId: string,
    @Body() body:LikeDto,
    @Req() req: any,
  ) {
    return this.forward(
      'post',
      `/comments/${commentId}/likes`,
      req,
      body
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
    @Body() body: createCollaborationDto,
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