import { Types } from "mongoose";
import { LikeEntity } from "src/module/domaine/entities/like.entity";

export class LikeMapper{

static LikeToLikeDocument(like: LikeEntity) {
  return {
    projectId: like.projectId,
    chapterId: like.chapterId,
    commentId: like.commentId,
    userId: new Types.ObjectId(like.userId),
  };
}

static LikeDocumentToLike(document: any): LikeEntity {
  return new LikeEntity({
    id: document._id,
    projectId: document.projectId,
    chapterId: document.chapterId,
    userId: document.userId.toString(),
    commentId: document.commentId,
    createdAt: document.createdAt,
  });
}

}