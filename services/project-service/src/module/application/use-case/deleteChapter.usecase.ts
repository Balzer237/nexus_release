import { Inject, Injectable, MethodNotAllowedException } from '@nestjs/common';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';

@Injectable()
export class DeleteChapter {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
  ) {}
  async execute(idChapter: string): Promise<any> {
    throw new MethodNotAllowedException('Method not implemented');
    //return this.repository.deleteChapter(idChapter);
  }
}
