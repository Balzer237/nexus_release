import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommentEntity } from '../../domaine/entities/comment.entity';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';
import { CommentMapper } from 'src/module/infrastructure/mapper/commentMapper';

@Injectable()
export class DeleteComment {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
  ) {}
  async execute(commentId: string): Promise<any> {
    const comment: CommentEntity =
      await this.repository.getCommentById(commentId);
    if (!comment) throw new NotFoundException('Comment not found');
    comment.setVisibility(false);
    return this.repository.saveComment(CommentMapper.commentToCommentDocument(comment));
  }
}
