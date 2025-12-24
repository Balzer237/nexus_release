import {
    Inject,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { CommentEntity } from '../../domaine/entities/comment.entity';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';
import { UpdateCommentDTO } from 'src/module/adapter/dto/entrant/updateComment.dto';
import { CommentMapper } from 'src/module/infrastructure/mapper/commentMapper';

@Injectable()
export class UpdateComment {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
  ) {}
  async execute(params: {
    data: UpdateCommentDTO;
    userId: string;
  }): Promise<any> {
    const comment: CommentEntity = await this.repository.getCommentById(
      params.data.commentId,
    );
    if (!comment) throw new NotFoundException("This comment doesn't exist");
    if (comment.getAuthor().toString() != params.userId) {
      throw new UnauthorizedException('Only owner can update');
    }
    comment.setContent(params.data.content);
    console.log('le comment', comment);
    return this.repository.saveComment(CommentMapper.commentToCommentDocument(comment));
  }
}
