import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ChapterEntity } from '../../domaine/entities/chapter.entity';
import { LikeEntity } from '../../domaine/entities/like.entity';
import { ProjectEntity } from '../../domaine/entities/projectEntity';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';

@Injectable()
export class getChapterByProject {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
  ) {}
  async execute(projectId: string, userId: string, filter?: any): Promise<any> {
    const project: ProjectEntity =
      await this.repository.findProjectById(projectId);

    if (!project)
      throw new NotFoundException("Project doesn't exist or desable");

    const allChapters: ChapterEntity[] =
      await this.repository.getChatpterByProject(
        projectId,
        project.getAuthor().toString() == userId,
      );

    const chapterId = allChapters.map((c) => c.getId());
    //on parcours les comments et si l'user a liker, on  recupere son objet likeEntity
    const liked: LikeEntity[] = await this.repository.allLikedRessource({
      ressourceId: chapterId,
      userId: userId,
      type: 'chapterId',
    });

    const likedChapterId = liked.map((c) => c.chapterId);

    const enrichiChapter = allChapters.map((c) => ({
      ...c,
      isLiked: likedChapterId.includes(c.getId().toString()),
    }));

    return enrichiChapter;
  }
}
