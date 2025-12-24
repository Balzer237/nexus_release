import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommentEntity } from '../../domaine/entities/comment.entity';
import { LikeEntity } from '../../domaine/entities/like.entity';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';

@Injectable()
export class getAllCommentByRessource {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
  ) {}
  async execute(
    projectId: string,
    type: number,
    participantId: string,
  ): Promise<any> {
    let typeStringValue: 'projectId' | 'chapterId';
    let ressource;
    switch (type) {
      case 1:
        typeStringValue = 'projectId';
        ressource = await this.repository.findProjectById(projectId);
        break;
      case 2:
        typeStringValue = 'chapterId';
        ressource = await this.repository.findChapterById(projectId);
        break;
      default:
        typeStringValue = 'projectId';
        ressource = await this.repository.findProjectById(projectId);
    }

    if (!ressource) throw new NotFoundException('Ressource not found');

    const comments: CommentEntity[] =
      await this.repository.getAllCommentByRessource({
        idRessource: projectId,
        type: typeStringValue,
      });
    const commentId = comments.map((c) => c.getId());

    //on parcours les comments et si l'user a liker, on  recupere son objet likeEntity
    const liked: LikeEntity[] = await this.repository.allLikedRessource({
      ressourceId: commentId,
      userId: participantId,
      type: 'commentId',
    });

    const likedCommentId = liked.map((c) => c.commentId);

    const enrichieComment = comments.map((c) => ({
      ...c,
      isLiked: likedCommentId.includes(c.getId().toString()),
    }));

    return enrichieComment;
  }
}
