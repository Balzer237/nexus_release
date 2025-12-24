import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';

@Injectable()
export class getCollaborationByProject {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
  ) {}
  async execute(projetcId: string, filter?: any): Promise<any> {
    const project = await this.repository.findProjectById(projetcId);
    if (!project) throw new NotFoundException('project not found');
    return this.repository.getAllCollaborationByProject(projetcId);
  }
}
