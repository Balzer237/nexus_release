export class LikeEntity {
  id: string;
  userId: string;
  projectId?: string;
  chapterId?: string;
  commentId?: string;
  createdAt: Date;
  constructor(params: {
    id: string;
    userId: string;
    projectId?: string;
    chapterId?: string;
    commentId?: string;
    createdAt: Date;
  }) {
    this.id = params.id;
    this.userId = params.userId;
    this.chapterId = params.chapterId;
    this.createdAt = params.createdAt;
    this.projectId = params.projectId;
    this.commentId = params.commentId;
  }
}
