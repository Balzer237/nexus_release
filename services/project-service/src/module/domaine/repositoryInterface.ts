import { addMediaToChapterDto } from '../adapter/dto/entrant/add-media-to-chapter.dto';
import { CreateProjectDto } from '../adapter/dto/entrant/create-project-dto';
import { CreateChapterDto } from '../adapter/dto/entrant/createChapter-dto';
import { CreateMediaDto } from '../adapter/dto/entrant/createMedia.dto';
import { InviteColabDto } from '../adapter/dto/entrant/inviteColab.dto';
import { submitModificationDto } from '../adapter/dto/entrant/submitModification.dto';
import { LikeEntity } from './entities/like.entity';

export abstract class ProjectRepositoryInterface {
  abstract addMediaToChapter(
    data: addMediaToChapterDto,
    idChapter: string,
  ): Promise<any>;

  // LIKE MANAGER
  abstract allReadyLikeRessource(data: {
    ressourceId: string;
    userId: string;
    type: 'commentId' | 'projectId' | 'chapterId';
  }): Promise<any>;
  abstract allLikedRessource(data: {
    ressourceId: string[];
    userId: string;
    type: 'commentId' | 'projectId' | 'chapterId';
  }): Promise<LikeEntity[]>;

  abstract deleteLike(likeId: string);
  abstract saveLike(data: any): Promise<LikeEntity>;

  abstract saveProject(project: any): Promise<any>;
  abstract findProjectById(idProject: string): Promise<any>;
  abstract getAllProject(filter: any, univerId: string): Promise<any>;
  abstract getAllProjectUserOnUniver(
    userId: string,
    univerId: string,
  ): Promise<any>;
  abstract creerProjetc(data: CreateProjectDto): Promise<any>;
  abstract deleteProject(idProject: string): Promise<any>;

  abstract saveChapter(chapter: any): Promise<any>;
  abstract findChapterById(idChapter: string): Promise<any>;
  abstract createChapter(data: CreateChapterDto): Promise<any>;
  abstract getChatpterByProject(
    idProject: string,
    isOwner?: boolean,
  ): Promise<any>;
  abstract deleteChapter(idChapter: string): Promise<any>;

  abstract createCollaboration(data: any): Promise<any>;
  abstract deleteCollaboration(idCollaboration: string): Promise<any>;
  abstract getCollaborationById(idCollaboration: string): Promise<any>;
  abstract getAllCollaborationByProject(idProject: string): Promise<any>;
  abstract getAllCollaborationByUser(idUser: string): Promise<any>;
  abstract saveCollaboration(collab: any): Promise<any>;

  abstract saveComment(comment: any): Promise<any>;
  abstract deleteComment(idComment: string): Promise<any>;
  abstract addComment(comment: any): Promise<any>;
  abstract getCommentById(idComment: string): Promise<any>;
  abstract getAllCommentByRessource(params: {
    idRessource: string;
    type: 'projectId' | 'chapterId';
  }): Promise<any>;
  abstract getAllCommentByUser(idUser: string): Promise<any>;

  abstract saveMedia(media: CreateMediaDto): Promise<any>;
  abstract createMedia(data: any): Promise<any>;
  abstract deleteMedia(idMedia: string): Promise<any>;
  abstract getMediaById(idMedia: string): Promise<any>;
  abstract getAllMediaByChapter(idChapter: string): Promise<any>;
  abstract getAllMediaByUser(idUser: string): Promise<any>;

  abstract invitColaborator(data: InviteColabDto): Promise<any>;
  abstract submitModification(data: submitModificationDto): Promise<any>;
}
