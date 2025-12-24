import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Collaboration,
  stateCollaboration,
} from '../../domaine/entities/collaboration.entity';
import { ProjectEntity } from '../../domaine/entities/projectEntity';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';
import { ProjectMapper } from 'src/module/infrastructure/mapper/projectMapper';
import { CollaborationMapper } from 'src/module/infrastructure/mapper/collaborationMapper';

@Injectable()
export class DeleteteCollaboration {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
  ) {}

  async execute(idCollaboration: any): Promise<any> {
    const collaboration: Collaboration =
      await this.repository.getCollaborationById(idCollaboration);
    if (!collaboration)
      throw new NotFoundException("this ressource doesn't exist");

    const project: ProjectEntity = await this.repository.findProjectById(
      collaboration.getProject().getId(),
    );
    if (!project) throw new BadRequestException('Project not found');

    project.deleteCollaboration({ user: collaboration.getUserId() });
    collaboration.setStatus(stateCollaboration.DELETE);


    Promise.all([
      this.repository.saveProject(ProjectMapper.projectToProjectDocument(project)),
      this.repository.saveCollaboration(
        CollaborationMapper.CollaborationEntityToDocument(collaboration),
      ),
    ]);

    return { success: true };
  }
}
