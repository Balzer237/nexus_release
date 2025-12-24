import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectEntity } from '../../domaine/entities/projectEntity';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';
import { MediaType } from 'src/lib/mediaType';
import { ProjectMapper } from 'src/module/infrastructure/mapper/projectMapper';

@Injectable()
export class UpdateBaniereProjectUsecase {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
  ) {}
  async execute(id: string, banier: MediaType): Promise<any> {
    const project: ProjectEntity = await this.repository.findProjectById(id);
    if (!project) throw new NotFoundException("This project doesn't exist");

    console.log('le project', project);

    project.setBaniere(banier);
    return await this.repository.saveProject(ProjectMapper.projectToProjectDocument(project));
  }
}
