import { MediaType } from "src/lib/mediaType";
import { ChapterEntity, chapterStatus } from "src/module/domaine/entities/chapter.entity";
import { stateCollaboration } from "src/module/domaine/entities/collaboration.entity";
import { CommentEntity, CommentType } from "src/module/domaine/entities/comment.entity";
import { CollaboratorRole, ProjectDifficulty, ProjectEntity, StatusProject, Visibility } from "src/module/domaine/entities/projectEntity";

export class ProjectSortantDto {
  id: string;
  title: string;
  description?: string;
  visibility: Visibility;
  author: string;
  univer: string;
  dificulty: ProjectDifficulty;
  status: StatusProject;
  baniere: MediaType;
  collaborators: {
    user: string;
    role: CollaboratorRole;
    joinedAt: Date;
  }[];
  commentCount: number;
  likeCount: number;
  shareCount: number;
  viewCount: number;
  allowedCollaborator: number;
  chapterCount: number;
  completionRate: number;
  gallery: number;
  createAt: Date;
  updateAt: Date;
  completAt: Date | null;
}

export class MediaSortantDto {
  id: string;

  chapter: ChapterEntity;
  project: ProjectEntity;
  uploadedBy: string;

  filename: string;
  originalName: string;

  title?: string;
  description?: string;
  type: string;

  dimention?: {
    width: number;
    height: number;
  };

  size: number;
  storagePath: string;
  duration?: number;
  thumbnails?: string;
  format: string;

  createAt: Date;
  updateAt: Date;
}

export class CommentSortantDto {
  id: string;
  type: CommentType;
  content: string;
  author: string;
  parentComment?: CommentEntity;
  isVisible: boolean = true;
  projectId?: string;
  chapterId?: string;
  createAt: Date;
  updateAt: Date;

  likeCount: number;
  replyCount: number;
  isSolution: boolean;
}

export class CollaborationSortantDto {
  id: string;
  project: ProjectEntity;
  sender: string;
  status: stateCollaboration;
  receiver: string;
  role: CollaboratorRole;
  invitedAt: Date = new Date();
  respondedAt?: Date;
  expiredAt: Date | null;
}

export class ChapterSortantDto {
  id: string;
  description?: string;
  title: string;
  MediaCount: number = 0;
  project: ProjectEntity;
  participant: string;

  order: number;

  status: chapterStatus;

  updateAt: Date = new Date();
  createAt: Date = new Date();
  publichedAt?: Date;
  commentCount: number;
  likeCount: number;
  shareCount: number;
  viewCount: number;
}
