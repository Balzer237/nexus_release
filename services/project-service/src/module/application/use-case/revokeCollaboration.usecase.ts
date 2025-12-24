import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  Collaboration,
  stateCollaboration,
} from '../../domaine/entities/collaboration.entity';
import { ProjectEntity } from '../../domaine/entities/projectEntity';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';
import { ChangeStatusCollaborationDto } from 'src/module/adapter/dto/entrant/gengeStatusCollaborationDto';
import { CollaborationMapper } from 'src/module/infrastructure/mapper/collaborationMapper';
import { ProjectMapper } from 'src/module/infrastructure/mapper/projectMapper';

@Injectable()
export class ChangeStatusCollaboration {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
    ) {}

  async execute(data: ChangeStatusCollaborationDto): Promise<any> {
    const collab: Collaboration = await this.repository.getCollaborationById(
      data.id,
    );
    let project: ProjectEntity;
    if (!collab) throw new NotFoundException('Collaboration not found');

    if (collab.getStatus() !== stateCollaboration.PENDING) {
      throw new BadRequestException(
        'Only pending collaborations can be updated',
      );
    }

    this.validateAuthorization(data, collab);

    collab.setStatus(data.status);
    collab.respondedAt = new Date();
    collab.expiredAt = null;
    const response = await this.repository.saveCollaboration(
      CollaborationMapper.CollaborationEntityToDocument(collab),
    );

    if (data.status === stateCollaboration.ACCEPTED) {
      project = await this.repository.findProjectById(
        collab.getProject().getId(),
      );
      if (!project) throw new NotFoundException('Project not found');
      project.setCollaborators({
        user: collab.getUserId(),
        role: collab.getRole(),
        joinedAt: new Date(),
      });
      await this.repository.saveProject(ProjectMapper.projectToProjectDocument(project));
    }

    return response;
  }

  private validateAuthorization(
    data: ChangeStatusCollaborationDto,
    collab: Collaboration,
  ) {
    const { senderId, status } = data;

    const isReceiver = senderId === collab.getUserId();
    const isOwner = senderId === collab.getInvitedBy();

    switch (status) {
      case stateCollaboration.ACCEPTED:
      case stateCollaboration.DECLINED:
        if (!isReceiver)
          throw new UnauthorizedException(
            'Only the invited user can accept or decline the collaboration.',
          );
        break;

      case stateCollaboration.ANNULER:
        if (!isOwner)
          throw new UnauthorizedException(
            'Only the project owner can cancel the collaboration.',
          );
        break;

      default:
        throw new BadRequestException(
          `Invalid collaboration status: ${status}`,
        );
    }
  }
}
