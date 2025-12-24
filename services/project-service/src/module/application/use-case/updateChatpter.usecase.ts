import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ChapterEntity } from '../../domaine/entities/chapter.entity';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';
import { UpdateChapterDTo } from 'src/module/adapter/dto/entrant/updateChapter.dto';
import { ChapterMapper } from 'src/module/infrastructure/mapper/chapterMapper';

@Injectable()
export class UpdateChapterUsecase {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
  ) {}
  async execute(params: { data: UpdateChapterDTo }): Promise<any> {
    const chapter: ChapterEntity = await this.repository.findChapterById(
      params.data.chapterId,
    );
    if (!chapter) throw new NotFoundException("This chapter doesn't exist");
    chapter.description = params.data.description;
    chapter.title = params.data.title;
    console.log('le chpater', chapter);
    return this.repository.saveChapter(ChapterMapper.chapterToChapterDocument(chapter));
  }
}
