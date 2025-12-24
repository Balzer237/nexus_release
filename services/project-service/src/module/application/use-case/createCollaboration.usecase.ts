import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ProjectEntity } from '../../domaine/entities/projectEntity';
import { DomainService } from '../../domaine/service/serviceInterface';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';
import { createCollaborationDto } from 'src/module/adapter/dto/entrant/createCollaborationDto';

@Injectable()
export class createCollaborationUseCase {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
    private readonly domaineService: DomainService,
  ) {}

  async execute(data: createCollaborationDto): Promise<any> {
    const project: ProjectEntity = await this.repository.findProjectById(
      data.projectId,
    );

    const AuthorProject =project.getAuthor();
  
    if (data.senderId == data.receiverId)
      throw new BadRequestException("Receiver can't be sender ");

    const limitByLevel = this.domaineService.limitByLevel(data.user);

    if (AuthorProject != data.senderId)
      throw new UnauthorizedException(
        "Seul l'auteur peux envoyer des demandes de collaboration",
      );
    if (
      project.getCollaborators().length >= project.setting.allowedCollaborator
    ) {
      throw new UnauthorizedException("This project can't add collaborator");
    }
    if (project.getCollaborators().length >= limitByLevel.collaboratorByProject)
      throw new Error(
        `Vous ne pouvez pas avoir plus de ${limitByLevel.collaboratorByProject} collaborateur pa projet`,
      );

    return this.repository.createCollaboration(data);
  }
}
