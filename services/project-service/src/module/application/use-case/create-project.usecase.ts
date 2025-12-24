import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ProjectDifficulty,
  ProjectEntity,
} from '../../domaine/entities/projectEntity';
import { DomainService } from '../../domaine/service/serviceInterface';
import { CreateProjectDto } from 'src/module/adapter/dto/entrant/create-project-dto';
import { ClientProxy } from '@nestjs/microservices';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';

@Injectable()
export class CreateProject {

  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
    @Inject('NATS_PROVIDER') private readonly nats_client:ClientProxy,
    private readonly domainService: DomainService,
    ) {}

  async execute(data: CreateProjectDto): Promise<any> {
    
    const limitLevel = this.domainService.limitByLevel(data.user);
    if (data.user.getProjectActif_count() >= limitLevel.projetcSimultaner)
      throw new Error(
        `Vous ne pouver pas avoir plus ${limitLevel.projetcSimultaner} projet en cours `,
      );
    if (!Object.values(ProjectDifficulty).includes(data.dificulty)) {
      throw new NotFoundException(
        'Valeur invalide pour la difficulté du projet',
      );
    }
    const data2 = {
      ...data,
      setting: {
        allowedCollabararo:
          this.domainService.limitByLevel(data.user).collaboratorByProject,
      },
    };
    const response: ProjectEntity = await this.repository.creerProjetc(data2);
    this.nats_client.emit('project_created',response);

    return response;
  }
}
