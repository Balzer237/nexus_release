 import { CommentSortantDto } from 'src/module/adapter/dto/sortant/AllDtoSortant.dto';
import { CommentEntity } from '../../domaine/entities/comment.entity';
import { Types } from 'mongoose';


export class CommentMapper{
   
static commentToCommentDocument(comment: CommentEntity): any {
  return {
    _id: comment.getId(),
    type: comment.type,
    Visibility: comment.getVisibility(),
    content: comment.getContent(),
    author: new Types.ObjectId(comment.getAuthor()),
    parentComment: comment.getParentComment(),
    projectId: comment.getProjectId(),
    chapterId: comment.chapterId,
    metric: comment.getMetric(),
    createAt: comment.createAt,
    updateAt: comment.updateAt,
  };
}
static commentDocumentToComment(commentDoc: any): CommentEntity {
  return new CommentEntity({
    id: commentDoc._id,
    type: commentDoc.type,
    content: commentDoc.content,
    isVisible: commentDoc.Visibility,
    author: commentDoc.author.toString(),
    parentComment: commentDoc.parentComment,
    projectId: commentDoc.projectId,
    chapterId: commentDoc.chapterId,
    metric: commentDoc.metric,
    createAt: commentDoc.createAt,
    updateAt: commentDoc.updateAt,
  });
}

static CommentEntityToSortant(
  entity: CommentEntity,
): CommentSortantDto {
  return {
    id: entity.getId(),
    type: entity.type,
    content: entity.getContent(),
    author: entity.getAuthor(),
    parentComment: entity.getParentComment(),
    isVisible: entity.getVisibility(),
    projectId: entity.getProjectId(),
    chapterId: entity.chapterId,
    createAt: entity.createAt,
    updateAt: entity.updateAt,

    likeCount: entity.getMetric().likeCount,
    replyCount: entity.getMetric().replyCount,
    isSolution: entity.getMetric().isSolution,
  };
}

}