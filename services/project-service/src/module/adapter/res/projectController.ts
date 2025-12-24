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
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateProject } from 'src/module/application/use-case/create-project.usecase';
import { CreateChapterUsecase } from 'src/module/application/use-case/createChapter.usecase';
import { createCollaborationUseCase } from 'src/module/application/use-case/createCollaboration.usecase';
import { CreateComment } from 'src/module/application/use-case/createComment.usecase';
import { CreateMediaUseCase } from 'src/module/application/use-case/createMedia.usecase';
import { DeleteChapter } from 'src/module/application/use-case/deleteChapter.usecase';
import { DeleteteCollaboration } from 'src/module/application/use-case/deleteCollaboration.use.case';
import { DeleteComment } from 'src/module/application/use-case/deleteComment.usecase';
import { DeleteMediaUseCase } from 'src/module/application/use-case/deleteMedia.usecase';
import { DeleteProjectUseCase } from 'src/module/application/use-case/deleteProject.usecase';
import { findChapterByIdUseCase } from 'src/module/application/use-case/findChapterById.usecase';
import { getAllCommentByRessource } from 'src/module/application/use-case/getAllCommentByProject.usecase';
import { GetAllMediaChapter } from 'src/module/application/use-case/getAllMediaChapter.usecase';
import { GetAllMediaByUser } from 'src/module/application/use-case/getAllMediaUser.usecase';
import { getAllProjectByUnivers } from 'src/module/application/use-case/getAllProjectByUnivers.usecase';
import { GetAllProjectUserOnUniverUseCase } from 'src/module/application/use-case/getAllProjectUserOnUniver';
import { getChapterByProject } from 'src/module/application/use-case/getChapterByProject.usecase';
import { getCollaborationByProject } from 'src/module/application/use-case/getCollaborationByProject.usecase';
import { getCollaborationOfUser } from 'src/module/application/use-case/getCollaborationByUser.usecase';
import { getMediaById } from 'src/module/application/use-case/getMediaById.usecase';
import { LikeCommentUseCase } from 'src/module/application/use-case/likeComment';
import { MarckCommentAsResponse } from 'src/module/application/use-case/marckCommentAsResponse';
import { publishChapterUseCase } from 'src/module/application/use-case/publierChapter.usecase';
import { ChangeStatusCollaboration } from 'src/module/application/use-case/revokeCollaboration.usecase';
import { SetStatusProject } from 'src/module/application/use-case/setStatus.usecase';
import { UpdateBaniereProjectUsecase } from 'src/module/application/use-case/updateBaniereProject.usecase';
import { UpdateChapterUsecase } from 'src/module/application/use-case/updateChatpter.usecase';
import { UpdateComment } from 'src/module/application/use-case/updateComment.usecase';
import { UpdateProjectUsecase } from 'src/module/application/use-case/updateProject.usecase';
import { SetVisibilityProject } from 'src/module/application/use-case/visibilityProject';
import { CreateProjectDto } from '../dto/entrant/create-project-dto';
import { UpdateProjectDTo } from '../dto/entrant/updateProject.dto';
import { SetVisibilityProjectDto } from '../dto/entrant/setVisibilityDto';
import { SetStatusProjectDto } from '../dto/entrant/setStatusDto';
import { CreateChapterDto } from '../dto/entrant/createChapter-dto';
import { UpdateChapterDTo } from '../dto/entrant/updateChapter.dto';
import { CreateCommentDto } from '../dto/entrant/createCommentDto';
import { UpdateCommentDTO } from '../dto/entrant/updateComment.dto';
import { MarckCommentAsResponseDto } from '../dto/entrant/marckCommentAsSolution.dto';
import { LikeDto } from '../dto/entrant/like.dto';
import { createCollaborationDto } from '../dto/entrant/createCollaborationDto';
import { CreateMediaDto } from '../dto/entrant/createMedia.dto';
import { getFileType } from 'src/lib/constant/fileType';
import { FileSize } from 'src/lib/constant/fileSizeMax';

@Controller()
export class ProjectsController {
  constructor(
    // Project use cases
    private readonly createProjectUseCase: CreateProject,
    private readonly updateProjectUseCase: UpdateProjectUsecase,
    private readonly deleteProjectUseCase: DeleteProjectUseCase,
    //private readonly getProjectByIdUseCase: GetProjectById,
    private readonly getProjectsByUniversityUseCase: getAllProjectByUnivers,
    private readonly getProjectsByParticipantUseCase: GetAllProjectUserOnUniverUseCase,
    private readonly setProjectVisibilityUseCase: SetVisibilityProject,
    private readonly setProjectStatusUseCase: SetStatusProject,
    private readonly updateProjectLogoUseCase: UpdateBaniereProjectUsecase,

    // Chapter use cases
    private readonly createChapterUseCase: CreateChapterUsecase,
    private readonly updateChapterUseCase: UpdateChapterUsecase,
    private readonly deleteChapterUseCase: DeleteChapter,
    private readonly getChapterByIdUseCase: findChapterByIdUseCase,
    private readonly getChaptersByProjectUseCase: getChapterByProject,
    private readonly publishChapterUseCase: publishChapterUseCase,

    // Media use cases
    private readonly createMediaUseCase: CreateMediaUseCase,
    private readonly deleteMediaUseCase: DeleteMediaUseCase,
    private readonly getMediaByIdUseCase: getMediaById,
    private readonly getUserMediaUseCase: GetAllMediaByUser,
    private readonly getChapterMediaUseCase: GetAllMediaChapter,

    // Comment use cases
    private readonly createCommentUseCase: CreateComment,
    private readonly updateCommentUseCase: UpdateComment,
    private readonly deleteCommentUseCase: DeleteComment,
    private readonly markCommentAsResponseUseCase: MarckCommentAsResponse,
    private readonly likeCommentUseCase: LikeCommentUseCase,

    // Collaboration use cases
    private readonly createCollaborationUseCase: createCollaborationUseCase,
    private readonly deleteCollaborationUseCase: DeleteteCollaboration,
    private readonly updateCollaborationStatusUseCase: ChangeStatusCollaboration,
    private readonly getProjectCollaborationsUseCase: getCollaborationByProject,
    private readonly getUserCollaborationsUseCase: getCollaborationOfUser,

    private readonly getCommentByRessource:getAllCommentByRessource

  ) {}

  /* ------------------------------------------------------------------
   * Projects
   * ------------------------------------------------------------------ */

  @Post('/projects')
  createProject(@Body() body: CreateProjectDto) {
    return this.createProjectUseCase.execute(body);
  }

  @Get('/universities/:universityId/user/:userId/projects')
  getProjectsByUniversity(@Param('universityId') universityId: string ,@Param('userId') userId:string) {
    return this.getProjectsByUniversityUseCase.execute(universityId,userId);
  }

  @Get('participants/:participantId/projects')
  getProjectsByParticipant(
    @Param('universityId') universityId: string,
    @Param('participantId') participantId: string,
  ) {
    return this.getProjectsByParticipantUseCase.execute(universityId, participantId);
  }

  // @Get('/projects/:projectId')
  // getProjectById(@Param('projectId') projectId: string) {
  //   return this.getProjectByIdUseCase.execute(projectId);
  // }

  @Patch('/projects/:projectId')
  updateProject(
    @Param('projectId') projectId: string,
    @Body() body: UpdateProjectDTo,
  ) {
    return this.updateProjectUseCase.execute({data:body});
  }

  @Delete('/projects/:projectId')
  deleteProject(
    @Param('projectId') projectId: string,
    @Query('participantId') participantId: string,
  ) {
    return this.deleteProjectUseCase.execute({participantId,projectId});
  }

  @Patch('/projects/:projectId/visibility')
  setProjectVisibility(
    @Param('projectId') projectId: string,
    @Body() body: SetVisibilityProjectDto,
  ) {
    return this.setProjectVisibilityUseCase.execute(body);
  }

  @Patch('/projects/:projectId/status')
  setProjectStatus(
    @Param('projectId') projectId: string,
    @Body() body: SetStatusProjectDto,
  ) {
    return this.setProjectStatusUseCase.execute(body);
  }

  @Patch('/projects/:projectId/logo')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter(req, file, callback) {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('File type not allowed'), false);
      }
      callback(null, true);
    },
    storage: diskStorage({
      destination: './uploads/projects/logo',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `logo-${uniqueSuffix}${ext}`);
      },
    }),
  }))

  updateProjectLogo(
    @Param('projectId') projectId: string,
    @UploadedFile() file: any,
    @Body() body: any,
  ) {
    const type = getFileType(file.mimetype);
    const data = {
      filename: file.filename,
      type,
      originalName: file.originalname,
      size: file.size,
      storagePath: file.path,
      format: file.mimetype,
      ...body,
    };
    return this.updateProjectLogoUseCase.execute(projectId, data);
  }

  /* ------------------------------------------------------------------
   * Chapters
   * ------------------------------------------------------------------ */

  @Post('/projects/:projectId/chapters')
  createChapter(
    @Param('projectId') projectId: string,
    @Body() body: CreateChapterDto,
  ) {
    return this.createChapterUseCase.execute(body);
  }

  @Get('/projects/:projectId/chapters')
  getProjectChapters(
    @Param('projectId') projectId: string,
    @Query('userId') userId: string,
  ) {
    return this.getChaptersByProjectUseCase.execute(projectId, userId);
  }

  @Get('/chapters/:chapterId')
  getChapterById(@Param('chapterId') chapterId: string) {
    return this.getChapterByIdUseCase.execute(chapterId);
  }

  @Patch('/chapters/:chapterId')
  updateChapter(
    @Param('chapterId') chapterId: string,
    @Body() body: UpdateChapterDTo,
  ) {
    return this.updateChapterUseCase.execute({data:body});
  }

  @Patch('/chapters/:chapterId/publish')
  publishChapter(
    @Param('chapterId') chapterId: string,
    @Query('participantId') participantId: string,
  ) {
    return this.publishChapterUseCase.execute(chapterId, participantId);
  }

  @Delete('/chapters/:chapterId')
  deleteChapter(@Param('chapterId') chapterId: string) {
    return this.deleteChapterUseCase.execute(chapterId);
  }

  /* ------------------------------------------------------------------
   * Media
   * ------------------------------------------------------------------ */

  @Get('/chapters/:chapterId/media')
  getChapterMedia(@Param('chapterId') chapterId: string) {
    return this.getChapterMediaUseCase.execute(chapterId);
  }

  @Get('/media/:mediaId')
  getMediaById(@Param('mediaId') mediaId: string) {
    return this.getMediaByIdUseCase.execute(mediaId);
  }

  @Get('/users/:userId/media')
  getUserMedia(@Param('userId') userId: string) {
    return this.getUserMediaUseCase.execute(userId);
  }

  @Post('/chapters/:chapterId/media')
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: FileSize.MEDIA },
    fileFilter(req, file, callback) {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|mp4|avi|mkv|mov)$/)) {
        return callback(new Error('File type not allowed'), false);
      }
      callback(null, true);
    },
    storage: diskStorage({
      destination: './uploads/media',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `media-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  createMedia(
    @Param('chapterId') chapterId: string,
    @UploadedFile() file: any,
    @Body() body: CreateMediaDto,
  ) {
    const type = getFileType(file.mimetype);
    const data = {
      ...body,
      chapterId,
      filename: file.filename,
      type,
      originalName: file.originalname,
      size: file.size,
      storagePath: file.path,
      format: file.mimetype,
    };
    return this.createMediaUseCase.execute(data);
  }

  @Delete('/media/:mediaId')
  deleteMedia(@Param('mediaId') mediaId: string) {
    return this.deleteMediaUseCase.execute(mediaId);
  }

  /* ------------------------------------------------------------------
   * Comments
   * ------------------------------------------------------------------ */

  @Post('/projects/:projectId/comments')
  createComment(
    @Param('projectId') projectId: string,
    @Body() body: CreateCommentDto,
  ) {
    return this.createCommentUseCase.execute(body);
  }

  @Get('/projects/:projectId/comments')
  getProjectComments(
    @Param('projectId') projectId: string,
    @Query('type') type: number,
    @Query('participantId') participantId: string,
  ) {
    return this.getCommentByRessource.execute(projectId, type, participantId);
  }

  @Patch('/comments/:commentId')
  updateComment(
    @Param('commentId') commentId: string,
    @Body() body: UpdateCommentDTO,
    @Req() req: any,
  ) {
    const userId = req.user?.id;
    return this.updateCommentUseCase.execute({data:body, userId});
  }

  @Patch('/comments/:commentId/response')
  markCommentAsResponse(@Body() body: MarckCommentAsResponseDto) {
    return this.markCommentAsResponseUseCase.execute(body);
  }

  @Post('/comments/:commentId/likes')
  likeComment(
    @Param('commentId') commentId: string,
    @Body() body:LikeDto,
    @Req() req: any,
  ) {
    const userId = req.user?.id;
    return this.likeCommentUseCase.execute(body, userId);
  }

  @Delete('/comments/:commentId')
  deleteComment(@Param('commentId') commentId: string) {
    return this.deleteCommentUseCase.execute(commentId);
  }

  /* ------------------------------------------------------------------
   * Collaborations
   * ------------------------------------------------------------------ */

  @Post('/projects/:projectId/collaborations')
  createCollaboration(
    @Param('projectId') projectId: string,
    @Body() body: createCollaborationDto,
  ) {
    return this.createCollaborationUseCase.execute(body);
  }

  @Get('/projects/:projectId/collaborations')
  getProjectCollaborations(@Param('projectId') projectId: string) {
    return this.getProjectCollaborationsUseCase.execute(projectId);
  }

  @Get('/users/:userId/collaborations')
  getUserCollaborations(@Param('userId') userId: string) {
    return this.getUserCollaborationsUseCase.execute(userId);
  }

  @Patch('/collaborations/:collaborationId/status')
  changeCollaborationStatus(
    @Param('collaborationId') collaborationId: string,
    @Body() body: any,
  ) {
    return this.updateCollaborationStatusUseCase.execute(body);
  }

  @Delete('/collaborations/:collaborationId')
  deleteCollaboration(@Param('collaborationId') collaborationId: string) {
    return this.deleteCollaborationUseCase.execute(collaborationId);
  }
}