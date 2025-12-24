import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ProjectEntity,
  StatusProject,
} from '../../domaine/entities/projectEntity';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';

@Injectable()
export class DeleteProjectUseCase {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
   ) {}
  async execute(data: {
    participantId: string;
    projectId: string;
  }): Promise<any> {
    const project: ProjectEntity = await this.repository.findProjectById(
      data.projectId,
    );
    if (!project) throw new NotFoundException('project not found');

    if (data.participantId != project.getAuthor())
      throw new UnauthorizedException('Only owner can delete');

    project.setStatus(StatusProject.DELETE);
   
    Promise.all([
      this.repository.saveProject(project),
    ]);
    return { seccess: true };
  }
}
