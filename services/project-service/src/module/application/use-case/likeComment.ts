import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { ChapterEntity } from '../../domaine/entities/chapter.entity';
import { CommentEntity } from '../../domaine/entities/comment.entity';
import { LikeEntity } from '../../domaine/entities/like.entity';
import { ProjectEntity } from '../../domaine/entities/projectEntity';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';
import { LikeDto } from 'src/module/adapter/dto/entrant/like.dto';
import { CommentMapper } from 'src/module/infrastructure/mapper/commentMapper';
import { ProjectMapper } from 'src/module/infrastructure/mapper/projectMapper';
import { ChapterMapper } from 'src/module/infrastructure/mapper/chapterMapper';
import { LikeMapper } from 'src/module/infrastructure/mapper/likeMapper';

@Injectable()
export class LikeCommentUseCase {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
  ) {}
  async execute(data: LikeDto, userId: string): Promise<any> {
    let type;
    switch (data.type) {
      case 0:
        type = 'commentId';
        break;
      case 1:
        type = 'projectId';
        break;
      case 2:
        type = 'chapter';
        break;
      default:
        throw new BadRequestException('Only type 0,1 and 2 are authorize');
    }

    const allReadyLike: LikeEntity =
      await this.repository.allReadyLikeRessource({
        ressourceId: data.resourceId,
        userId: userId,
        type: type,
      });
    let ressource: ProjectEntity | ChapterEntity | CommentEntity;

    switch (data.type) {
      case 0:
        ressource = await this.repository.getCommentById(data.resourceId);
        break;
      case 1:
        ressource = await this.repository.findProjectById(data.resourceId);
        break;
      case 2:
        ressource = await this.repository.findChapterById(data.resourceId);
        break;
      default:
        throw new BadRequestException('Unknow Type of ressource');
    }

    ressource.setLikeCount(allReadyLike ? -1 : 1);
    let r: any;
    switch (data.type) {
      case 0:
        r = {
          userId: userId,
          commentId: data.resourceId,
        };
        await this.repository.saveComment(
          CommentMapper.commentToCommentDocument(ressource as CommentEntity),
        );
        break;
      case 1:
        r = {
          userId: userId,
          projectId: data.resourceId,
        };
        await this.repository.saveProject(
          ProjectMapper.projectToProjectDocument(ressource as ProjectEntity),
        );
        break;
      case 2:
        r = {
          userId: userId,
          chapterId: data.resourceId,
        };
        await this.repository.saveChapter(
          ChapterMapper.chapterToChapterDocument(ressource as ChapterEntity),
        );
        break;
    }
    (await allReadyLike)
      ? this.repository.deleteLike(allReadyLike.id)
      : this.repository.saveLike(LikeMapper.LikeToLikeDocument(r));
    return { success: true };
  }
}
