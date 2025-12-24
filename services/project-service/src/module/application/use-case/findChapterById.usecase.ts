import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';

@Injectable()
export class findChapterByIdUseCase {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
  ) {}
  async execute(chapterId: string): Promise<any> {
    const chapter = await this.repository.findChapterById(chapterId);
    if (!chapter) throw new NotFoundException('chapter not found');
    return chapter;
  }
}
