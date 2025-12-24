import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ProjectEntity,
  StatusProject,
} from '../../domaine/entities/projectEntity';
import { DomainService } from '../../domaine/service/serviceInterface';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';
import { SetStatusProjectDto } from 'src/module/adapter/dto/entrant/setStatusDto';
import { ProjectMapper } from 'src/module/infrastructure/mapper/projectMapper';

@Injectable()
export class SetStatusProject {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
    private readonly domainService: DomainService,
  ) {}

  async execute(data: SetStatusProjectDto): Promise<any> {
    const project: ProjectEntity = await this.repository.findProjectById(
      data.projectId,
    );
    if (!project) {
      throw new BadRequestException('Project not found');
    }

    if (data.ownerId.toString() !== project.getAuthor().toString()) {
      throw new UnauthorizedException(
        'Only the project owner can update status',
      );
    }

    const previousStatus = project.getStatus();
    let nextStatus: StatusProject;

    switch (data.status) {
      case 0:
        nextStatus = StatusProject.DELETE;
        break;

      case 1:
        nextStatus = StatusProject.IN_PROGRESS;
        break;

      case 2:
        nextStatus = StatusProject.PAUSE;
        break;

      case 3:
        nextStatus = StatusProject.ABBANDONER;
        break;

      default:
        throw new BadRequestException(
          'Only value 0,1,2,3 are allowed (0->Delete, 1->Publier, 2->Pause, 3->Abandonner)',
        );
    }

    if (!this.isTransitionAllowed(previousStatus, nextStatus)) {
      throw new UnauthorizedException(
        `Cannot change project status from ${previousStatus} to ${nextStatus}`,
      );
    }

    if (nextStatus === StatusProject.IN_PROGRESS) {
      const canPublier = this.domainService.canPublierProject(project);
      if (!canPublier) {
        throw new BadRequestException(
          'This project must contain at least one chapter before publication',
        );
      }
    }

    project.setStatus(nextStatus);

    return await this.repository.saveProject(ProjectMapper.projectToProjectDocument(project));
  }

  private isTransitionAllowed(
    previous: StatusProject,
    next: StatusProject,
  ): boolean {
    const allowedTransitions: Record<StatusProject, StatusProject[]> = {
      [StatusProject.IDEA]: [StatusProject.IN_PROGRESS, StatusProject.DELETE],
      [StatusProject.IN_PROGRESS]: [
        StatusProject.PAUSE,
        StatusProject.ABBANDONER,
        StatusProject.DELETE,
        StatusProject.END,
      ],
      [StatusProject.PAUSE]: [
        StatusProject.IN_PROGRESS,
        StatusProject.ABBANDONER,
        StatusProject.DELETE,
      ],
      [StatusProject.ABBANDONER]: [],
      [StatusProject.DELETE]: [],
      [StatusProject.END]: [],
    };

    const allowedNext = allowedTransitions[previous] || [];
    return allowedNext.includes(next);
  }
}
