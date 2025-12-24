import { Inject, NotFoundException } from '@nestjs/common';
import {
  CommentEntity,
  CommentType,
} from '../../domaine/entities/comment.entity';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';
import { MarckCommentAsResponseDto } from 'src/module/adapter/dto/entrant/marckCommentAsSolution.dto';
import { CommentMapper } from 'src/module/infrastructure/mapper/commentMapper';

export class MarckCommentAsResponse {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,

    ) {}
  async execute(commentData: MarckCommentAsResponseDto) {
    
    const comment: CommentEntity = await this.repository.getCommentById(
      commentData.commentIs,
    );
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.type !== CommentType.SUGGESTION) {
      throw new NotFoundException(
        'This comment is not type of suggestion response',
      );
    }
    comment.getMetric().isSolution = true;
    await this.repository.saveComment(CommentMapper.commentToCommentDocument(comment));
    }
}
