import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ChapterEntity,
  chapterStatus,
} from '../../domaine/entities/chapter.entity';
import { ProjectEntity } from '../../domaine/entities/projectEntity';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';
import { ChapterMapper } from 'src/module/infrastructure/mapper/chapterMapper';
import { ProjectMapper } from 'src/module/infrastructure/mapper/projectMapper';

@Injectable()
export class publishChapterUseCase {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
    ) {}
  async execute(chapterId: string, participantId: string): Promise<any> {
    console.log('par', participantId, chapterId);
    
    const chapter: ChapterEntity =
      await this.repository.findChapterById(chapterId);
    if (!chapter) throw new NotFoundException('Chapter not found');

    if (chapter.getStatus() != chapterStatus.DRAFT)
      throw new UnauthorizedException('Only draf chapter can be update');

    const project: ProjectEntity = await this.repository.findProjectById(
      chapter.getProject().getId(),
    );

    chapter.setOrganization({ order: project.getChapterCount() + 1 });
    project.setChapterCount(1);
    
    chapter.setStatus(chapterStatus.PUBLISHED);
    chapter.publichedAt = new Date();

    const [chapterR, projectR] = await Promise.all([
      this.repository.saveChapter(ChapterMapper.chapterToChapterDocument(chapter)),
       this.repository.saveProject(ProjectMapper.projectToProjectDocument(project)),
    ]);
    return chapterR;
  }
}
