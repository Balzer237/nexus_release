import { InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CollaborationDocument } from './schema/collaborationSchema';
import { CommentDocument } from './schema/commentSchema';
import { LikeDocument } from './schema/likeSchema';
import { MediaDocument } from './schema/mediaShema';
import { ProjectDocument } from './schema/projectShema';
import { ChapterDocument } from './schema/chapterSchema';
import { LikeEntity } from 'src/module/domaine/entities/like.entity';
import { CreateChapterDto } from 'src/module/adapter/dto/entrant/createChapter-dto';
import { addMediaToChapterDto } from 'src/module/adapter/dto/entrant/add-media-to-chapter.dto';
import { chapterStatus } from 'src/module/domaine/entities/chapter.entity';
import { StatusProject, Visibility } from 'src/module/domaine/entities/projectEntity';
import { CreateProjectDto } from 'src/module/adapter/dto/entrant/create-project-dto';
import { InviteColabDto } from 'src/module/adapter/dto/entrant/inviteColab.dto';
import { stateCollaboration } from 'src/module/domaine/entities/collaboration.entity';
import { submitModificationDto } from 'src/module/adapter/dto/entrant/submitModification.dto';
import { CollaborationMapper } from '../mapper/collaborationMapper';
import { CommentMapper } from '../mapper/commentMapper';
import { MediaMapper } from '../mapper/mediaMapper';
import { ProjectMapper } from '../mapper/projectMapper';
import { ChapterMapper } from '../mapper/chapterMapper';
import { LikeMapper } from '../mapper/likeMapper';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';

export class ProjectRepositoryMongooseImplementation extends ProjectRepositoryInterface {
  constructor(
    @InjectModel('Project')
    private readonly projectModel: Model<ProjectDocument>,
    @InjectModel('Chapter')
    private readonly chapterModel: Model<ChapterDocument>,
    @InjectModel('Collaboration')
    private readonly collaborationModel: Model<CollaborationDocument>,
    @InjectModel('Comment')
    private readonly commentModel: Model<CommentDocument>,
    @InjectModel('Media')
    private readonly mediaModel: Model<MediaDocument>,
    @InjectModel('Like')
    private readonly likeModel: Model<LikeDocument>,
  ) {
    super();
  }
  async allReadyLikeRessource(data: {
    ressourceId: string;
    userId: string;
    type: 'commentId' | 'projectId' | 'chapterId';
  }): Promise<any> {
    let allready;
    try {
      allready = await this.likeModel
        .findOne({
          [data.type]: data.ressourceId,
          userId: data.userId,
        })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(
        'something went wrong ' + error + '',
      );
    }
    return allready ? LikeMapper.LikeDocumentToLike(allready) : allready;
  }
  async allLikedRessource(data: {
    ressourceId: string[];
    userId: string;
    type: 'commentId' | 'projectId' | 'chapterId';
  }): Promise<LikeEntity[]> {
    let allready;
    try {
      allready = await this.likeModel
        .find({
          [data.type]: { $in: data.ressourceId },
          userId: data.userId,
        })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(
        'something went wrong' + error + '',
      );
    }
    return allready.map(LikeMapper.LikeDocumentToLike);
  }
  async deleteLike(likeId: string) {
    try {
      await this.likeModel.findByIdAndDelete(likeId).exec();
    } catch (error) {
      throw new InternalServerErrorException(
        'Something wen wrong ' + error + '',
      );
    }
  }
  async saveLike(data: any): Promise<LikeEntity> {
    const response = await new this.likeModel(data).save();
    return LikeMapper.LikeDocumentToLike(response);
  }

  // -------------------------------
  // CHAPTER
  // -------------------------------

  async createChapter(data: CreateChapterDto): Promise<any> {
    const newChapter = await new this.chapterModel(data).save();
    return ChapterMapper.chapterDocumentToChapter(newChapter);
  }

  async addMediaToChapter(
    data: addMediaToChapterDto,
    idChapter: string,
  ): Promise<any> {
    const media = await new this.mediaModel({
      ...data,
      chapter: idChapter,
    }).save();

    await this.chapterModel.findByIdAndUpdate(idChapter, {
      $push: { medias: media._id },
    });

    return MediaMapper.mediaDocumentToMedia(media);
  }

  async saveChapter(chapter: any): Promise<any> {
    const updated = await this.chapterModel
      .findByIdAndUpdate({ _id: chapter._id }, chapter, { new: true })
      .exec();
    return updated ? ChapterMapper.chapterDocumentToChapter(updated) : null;
  }

  async findChapterById(idChapter: string): Promise<any> {
    const chapter = await this.chapterModel
      .findById(new Types.ObjectId(idChapter))
      .populate('project')
      .populate('userId')
      .exec();
    return chapter ? ChapterMapper.chapterDocumentToChapter(chapter) : null;
  }

  async deleteChapter(idChapter: string): Promise<any> {
    return this.chapterModel.findByIdAndDelete(idChapter).exec();
  }

  async getChatpterByProject(
    idProject: string,
    isOwner: boolean = false,
  ): Promise<any> {
    const query: any = {
      project: idProject,
    };

    if (!isOwner) {
      query.status = { $ne: chapterStatus.DRAFT };
    }

    const allchapterProject = await this.chapterModel
      .find(query)
      .populate('project')
      .populate('userId')
      .sort({ createdAt: -1 });

    return allchapterProject.map(ChapterMapper.chapterDocumentToChapter);
  }
  // -------------------------------
  // PROJECT
  // -------------------------------

  async saveProject(project: any): Promise<any> {
    const updated = await this.projectModel
      .findByIdAndUpdate(project._id, project, { new: true })
      .exec();
    return updated ? ProjectMapper.projectDocumentToProject(updated) : null;
  }

  async findProjectById(idProject: string): Promise<any> {
    const project = await this.projectModel
      .findOne({ _id: idProject, status: { $nin: [StatusProject.DELETE] } })
      .populate('Author')
      .populate('univer')
      .exec();
    return project ? ProjectMapper.projectDocumentToProject(project) : null;
  }
  async getAllProjectUserOnUniver(
    userId: string,
    univerId: string,
  ): Promise<any> {
    const allUserProject = await this.projectModel
      .find({
        univer: univerId,
        Author: userId,
        status: { $ne: StatusProject.DELETE },
      })
      .populate({
        path: 'collaborators',
        populate: {
          path: 'user',
        },
      })
      .populate('author')
      .populate('univer')
      .exec();
    return allUserProject.map(ProjectMapper.projectDocumentToProject);
  }
  async creerProjetc(data: CreateProjectDto): Promise<any> {
    const project = await new this.projectModel(data).save();
    return ProjectMapper.projectDocumentToProject(project);
  }

  async deleteProject(idProject: string): Promise<any> {
    return this.projectModel.findByIdAndDelete(idProject).exec();
  }

  async getAllProject(filter: any, univerId: string): Promise<any> {
    const allProject = await this.projectModel
      .find({
        univer: univerId,
        status: {
          $in: [
            StatusProject.IN_PROGRESS,
            StatusProject.END,
            StatusProject.PAUSE,
            StatusProject.ABBANDONER,
          ],
        },
        visibility: { $eq: Visibility.PUBLIC },
      })
      .populate('author')
      .populate('univer')
      .exec();
    return allProject.map(ProjectMapper.projectDocumentToProject);
  }

  // -------------------------------
  // COLLABORATION
  // -------------------------------

  async saveCollaboration(collab: any): Promise<any> {
    const collabreponse = await this.collaborationModel
      .findByIdAndUpdate(collab._id, collab, { new: true })
      .exec();
    return CollaborationMapper.collaborationDocumentToCollaborationEntity(collabreponse);
  }
  async invitColaborator(data: InviteColabDto): Promise<any> {
    const collaboration = await new this.collaborationModel(data).save();
    return collaboration;
  }

  async createCollaboration(data: any): Promise<any> {
    const collab = await new this.collaborationModel(data).save();
    return CollaborationMapper.collaborationDocumentToCollaborationEntity(collab);
  }

  async deleteCollaboration(idCollaboration: string): Promise<any> {
    return this.collaborationModel.findByIdAndDelete(idCollaboration).exec();
  }

  async getCollaborationById(idCollaboration: string): Promise<any> {
    const collab = await this.collaborationModel
      .findById(idCollaboration)
      .exec();
    return CollaborationMapper.collaborationDocumentToCollaborationEntity(collab);
  }

  async getAllCollaborationByProject(idProject: string): Promise<any> {
    const collab = await this.collaborationModel
      .find({
        projectId: idProject,
        status: {
          $eq: stateCollaboration.ACCEPTED,
        },
      })
      .populate('senderId', '-password')
      .populate('receiverId', '-password')
      .exec();

    return collab.map(CollaborationMapper.collaborationDocumentToCollaborationEntity);
  }

  async getAllCollaborationByUser(idUser: string): Promise<any> {
    const collab = await this.collaborationModel
      .find({ $or: [{ senderId: idUser }, { receiverId: idUser }] })
      .populate('senderId', '-password')
      .populate('receiverId', '-password')
      .exec();
    return collab.map(CollaborationMapper.collaborationDocumentToCollaborationEntity);
  }

  // -------------------------------
  // COMMENT
  // -------------------------------

  async saveComment(comment: any): Promise<any> {
    const result = await this.commentModel.findByIdAndUpdate(
      comment._id,
      comment,
      { new: true },
    );
    return CommentMapper.commentDocumentToComment(result);
  }
  async addComment(comment: any): Promise<any> {
    const commentResult = await new this.commentModel(comment).save();
    return CommentMapper.commentDocumentToComment(commentResult);
  }

  async deleteComment(idComment: string): Promise<any> {
    return this.commentModel.findByIdAndDelete(idComment).exec();
  }

  async getCommentById(idComment: string): Promise<any> {
    const comment = await this.commentModel.findById(idComment).exec();
    return comment ? CommentMapper.commentDocumentToComment(comment) : null;
  }

  async getAllCommentByRessource(params: {
    idRessource: string;
    type: 'projectId' | 'chapterId';
  }): Promise<any> {
    const comments = await this.commentModel
      .find({ [params.type]: params.idRessource, isVisible: true })
      .populate('author')
      .exec();
    return comments.map(CommentMapper.commentDocumentToComment);
  }

  async getAllCommentByUser(idUser: string): Promise<any> {
    const comments = await this.commentModel.find({ user: idUser }).exec();
    return comments.map(CommentMapper.commentDocumentToComment);
  }

  // -------------------------------
  // MEDIA
  // -------------------------------

  async saveMedia(media: any): Promise<any> {
    const response = await this.mediaModel.findByIdAndUpdate(media._id, media, {
      new: true,
    });
    return MediaMapper.mediaDocumentToMedia(response);
  }
  async createMedia(data: any): Promise<any> {
    const media = await new this.mediaModel(data).save();
    return MediaMapper.mediaDocumentToMedia(media);
  }

  async deleteMedia(idMedia: string): Promise<any> {
    return this.mediaModel.findByIdAndDelete(idMedia).exec();
  }

  async getMediaById(idMedia: string): Promise<any> {
    const media = await this.mediaModel
      .findById(idMedia)
      .populate('project')
      .populate('chapter')
      .exec();
    return MediaMapper.mediaDocumentToMedia(media);
  }

  async getAllMediaByChapter(idChapter: string): Promise<any> {
    const allMedia = await this.mediaModel
      .find({ chapter: idChapter }, { storagePath: 0 })
      .populate('project')
      .populate('chapter')
      .exec();
    return allMedia.map(MediaMapper.mediaDocumentToMedia);
  }

  async getAllMediaByUser(idUser: string): Promise<any> {
    console.log('userid', idUser);
    const allMedia = await this.mediaModel
      .find({ uploadedBy: idUser })
      .populate('project')
      .populate('chapter')
      .exec();
    return allMedia.map(MediaMapper.mediaDocumentToMedia);
  }

  // -------------------------------
  // MODIFICATION
  // -------------------------------

  async submitModification(data: submitModificationDto): Promise<any> {
    // Hypothèse : une modification crée un "collaboration" ou un "log" temporaire
    const modification = await this.collaborationModel.create({
      ...data,
      status: 'PENDING',
    });
    return modification;
  }
}
