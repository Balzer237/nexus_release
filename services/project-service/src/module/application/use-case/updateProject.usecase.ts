import {
    Inject,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { ProjectEntity } from '../../domaine/entities/projectEntity';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';
import { UpdateProjectDTo } from 'src/module/adapter/dto/entrant/updateProject.dto';
import { ProjectMapper } from 'src/module/infrastructure/mapper/projectMapper';

@Injectable()
export class UpdateProjectUsecase {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
    ) {}
  async execute(params: { data: UpdateProjectDTo }): Promise<any> {
    
    const project: ProjectEntity = await this.repository.findProjectById(
      params.data.projectId,
    );
    if (!project) throw new NotFoundException("This project doesn't exist");

    if (params.data.participantId != project.getAuthor().toString())
      throw new UnauthorizedException('Only owner can update');
    project.setDescription(params.data.description);
    project.setTitle(params.data.title);
    console.log('le project', project);
    return this.repository.saveProject(ProjectMapper.projectToProjectDocument(project));
  }
}
