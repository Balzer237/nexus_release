
import { ProjectSortantDto } from 'src/module/adapter/dto/sortant/AllDtoSortant.dto';
import {
  ProjectEntity,
  Visibility,
} from '../../domaine/entities/projectEntity';
import { Types } from 'mongoose';


export class ProjectMapper{

static projectToProjectDocument(project: ProjectEntity): any {
  return {
    _id: project.getId(),
    title: project.title,
    description: project.description,
    baniere: project.getBaniere(),
    visibility: project.getVisibility(),
    status: project.getStatus(),
    univer: new Types.ObjectId(project.getUniver()),
    dificulty: project.dificulty,
    author: new Types.ObjectId(project.getAuthor()),
    collaborators: project.getCollaborators(),
    statistique: project.getStatistique(),
    chapterCount: project.getChapterCount(),
    completionRate: project.completionRate,
    gallery: project.gallery,
    setting: project.setting,
    createAt: project.createAt,
    updateAt: project.updateAt,
    completAt: project.completAt,
  };
}

static projectDocumentToProject(document: any): ProjectEntity {
  return new ProjectEntity({
    id: document._id,
    title: document.title,
    description: document.description,
    author: document.Author.toString(),
    univer: document.univer.toString(),
    dificulty: document.dificulty,
    baniere: document.baniere,
    status: document.status,
    gallery: document.gallery,
    collaborators: document.collaborators,
    statistique: document.statistique,
    chapterCount: document.chapterCount,
    completionRate: document.completionRate,
    createAt: document.createAt,
    updateAt: document.updateAt,
    completAt: document.completAt,
    setting: document.setting,
    visibility: document.visibility || Visibility.PRIVATE,
  });
}

static ProductEntityToSortant(
  entity: ProjectEntity,
): ProjectSortantDto {
  return {
    id: entity.getId(),
    title: entity.title,
    description: entity.description,
    visibility: entity.getVisibility(),
    author: entity.getAuthor(),
    univer: entity.getUniver(),
    dificulty: entity.dificulty,
    status: entity.getStatus(),
    baniere: entity.getBaniere(),
    collaborators: entity.getCollaborators(),
    commentCount: entity.getStatistique().commentCount,
    likeCount: entity.getStatistique().likeCount,
    shareCount: entity.getStatistique().shareCount,
    viewCount: entity.getStatistique().viewCount,
    allowedCollaborator: entity.setting.allowedCollaborator,
    chapterCount: entity.getChapterCount(),
    completionRate: entity.completionRate,
    gallery: entity.gallery,
    createAt: entity.createAt,
    updateAt: entity.updateAt,
    completAt: entity.completAt,
  };
}

}