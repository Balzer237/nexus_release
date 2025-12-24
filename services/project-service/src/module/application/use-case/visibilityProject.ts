import {
  BadRequestException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ProjectEntity,
  Visibility,
} from '../../domaine/entities/projectEntity';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';
import { SetVisibilityProjectDto } from 'src/module/adapter/dto/entrant/setVisibilityDto';
import { ProjectMapper } from 'src/module/infrastructure/mapper/projectMapper';

export class SetVisibilityProject {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
    ) {}
  async execute(data: SetVisibilityProjectDto): Promise<any> {
    let visibility;

    switch (data.visibility) {
      case 1:
        visibility = Visibility.CONTRUBUABLE;
        break;
      case 0:
        visibility = Visibility.PRIVATE;
        break;
      case 2:
        visibility = Visibility.PUBLIC;
        break;
      default:
        throw new BadRequestException('Only value 0,1 and 2 are allowed');
    }
    

    const project: ProjectEntity = await this.repository.findProjectById(
      data.projectId,
    );

    if (data.ownerId != project.getAuthor()) {
      throw new UnauthorizedException('Only owner can update');
    }

    project.setVisibility(visibility);
    return await this.repository.saveProject(ProjectMapper.projectToProjectDocument(project));
  }
}
