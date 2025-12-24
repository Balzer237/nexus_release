import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UpdateBaniereProjectUsecase } from './application/use-case/updateBaniereProject.usecase';
import { UpdateProjectUsecase } from './application/use-case/updateProject.usecase';
import { UpdateChapterUsecase } from './application/use-case/updateChatpter.usecase';
import { SetStatusProject } from './application/use-case/setStatus.usecase';
import { DeleteProjectUseCase } from './application/use-case/deleteProject.usecase';
import { DeleteteCollaboration } from './application/use-case/deleteCollaboration.use.case';
import { getChapterByProject } from './application/use-case/getChapterByProject.usecase';
import { LikeCommentUseCase } from './application/use-case/likeComment';
import { GetAllProjectUserOnUniverUseCase } from './application/use-case/getAllProjectUserOnUniver';
import { SetVisibilityProject } from './application/use-case/visibilityProject';
import { DeleteMediaUseCase } from './application/use-case/deleteMedia.usecase';
import { ChangeStatusCollaboration } from './application/use-case/revokeCollaboration.usecase';
import { publishChapterUseCase } from './application/use-case/publierChapter.usecase';
import { MarckCommentAsResponse } from './application/use-case/marckCommentAsResponse';
import { UpdateComment } from './application/use-case/updateComment.usecase';
import { getMediaById } from './application/use-case/getMediaById.usecase';
import { getCollaborationOfUser } from './application/use-case/getCollaborationByUser.usecase';
import { getCollaborationByProject } from './application/use-case/getCollaborationByProject.usecase';
import { GetAllMediaByUser } from './application/use-case/getAllMediaUser.usecase';
import { GetAllMediaChapter } from './application/use-case/getAllMediaChapter.usecase';
import { findChapterByIdUseCase } from './application/use-case/findChapterById.usecase';
import { getAllProjectByUnivers } from './application/use-case/getAllProjectByUnivers.usecase';
import { CreateProject } from './application/use-case/create-project.usecase';
import { CreateChapterUsecase } from './application/use-case/createChapter.usecase';
import { createCollaborationUseCase } from './application/use-case/createCollaboration.usecase';
import { CreateComment } from './application/use-case/createComment.usecase';
import { CreateMediaUseCase } from './application/use-case/createMedia.usecase';
import { DeleteChapter } from './application/use-case/deleteChapter.usecase';
import { DeleteComment } from './application/use-case/deleteComment.usecase';
import { getAllCommentByRessource } from './application/use-case/getAllCommentByProject.usecase';
import { DomainService } from './domaine/service/serviceInterface';
import { ProjectRepositoryMongooseImplementation } from './infrastructure/mongoose/repositoryImplementation';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeSchema } from './infrastructure/mongoose/schema/likeSchema';
import { projectSchema } from './infrastructure/mongoose/schema/projectShema';
import { mediaSchema } from './infrastructure/mongoose/schema/mediaShema';
import { CollaborationSchema } from './infrastructure/mongoose/schema/collaborationSchema';
import { commentSchema } from './infrastructure/mongoose/schema/commentSchema';
import { chapterSchema } from './infrastructure/mongoose/schema/chapterSchema';

@Module({
    imports:[
        MongooseModule.forFeature([
      { name: 'Like', schema: LikeSchema },
      { name: 'Project', schema: projectSchema },
      { name: 'Media', schema: mediaSchema },
      { name: 'Collaboration', schema: CollaborationSchema },
      { name: 'Comment', schema: commentSchema },
      { name: 'Chapter', schema: chapterSchema },
    ]),
    ],
    providers:[
        {
            provide: 'NATS_PROVIDER',
            useFactory: () => {
            return ClientProxyFactory.create({
                transport: Transport.NATS,
                options: {
                servers: [process.env.NATS_URL || 'nats://localhost:4222'],
                },
            });
            }
        },

        UpdateBaniereProjectUsecase,
        UpdateProjectUsecase,
        UpdateChapterUsecase,
        SetStatusProject,
        DeleteProjectUseCase,
        DeleteteCollaboration,
        getChapterByProject,
        LikeCommentUseCase,
        GetAllProjectUserOnUniverUseCase,
        SetVisibilityProject,
        DeleteMediaUseCase,
        ChangeStatusCollaboration,
        publishChapterUseCase,
        MarckCommentAsResponse,
        UpdateComment,
        getMediaById,
        getCollaborationOfUser,
        getCollaborationByProject,
        GetAllMediaByUser,
        GetAllMediaChapter,
        findChapterByIdUseCase,
        getAllProjectByUnivers,
        CreateProject,
        CreateChapterUsecase,
        createCollaborationUseCase,
        CreateComment,
        CreateMediaUseCase,
        DeleteChapter,
        DeleteComment,
        getAllCommentByRessource,
        DomainService,
        {
        provide: 'mongooseRepository',
        useClass: ProjectRepositoryMongooseImplementation,
        },
    ]
})
export class ProjectModule {}
