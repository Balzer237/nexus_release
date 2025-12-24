import { CommentType } from "src/module/domaine/entities/comment.entity";

export class CreateCommentDto {
  type: CommentType;
  content: string;
  parentComment?: string;
  author: string;
  projectId: string;
  chapterId: string;
}
