import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ChapterEntity } from '../../domaine/entities/chapter.entity';
import { CommentType } from '../../domaine/entities/comment.entity';
import { ProjectEntity } from '../../domaine/entities/projectEntity';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';
import { ChapterMapper } from 'src/module/infrastructure/mapper/chapterMapper';
import { ProjectMapper } from 'src/module/infrastructure/mapper/projectMapper';

@Injectable()
export class CreateComment {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
   ) {}
  async execute(data: any): Promise<any> {
  
    const projectOrchapter: ChapterEntity | ProjectEntity = data.chapterId
      ? await this.repository.findChapterById(data.chapterId)
      : await this.repository.findProjectById(data.projectId);
    if (!projectOrchapter) throw new NotFoundException('project not found');

    const parentComment =
      data.parentComment &&
      (await this.repository.getCommentById(data.parentComment));
    if (data.parentComment && !parentComment)
      throw new NotFoundException('Parent comment not found');

    if (!Object.values(CommentType).includes(data.type))
      throw new BadRequestException("this type doesn't exist");
    projectOrchapter.setCommentCount(1);
    
    data.chapterId
      ? await this.repository.saveChapter(
          ChapterMapper.chapterToChapterDocument(projectOrchapter as ChapterEntity),
        )
      : await this.repository.saveProject(
          ProjectMapper.projectToProjectDocument(projectOrchapter as ProjectEntity),
        );

    return await this.repository.addComment(data);
  }
}
