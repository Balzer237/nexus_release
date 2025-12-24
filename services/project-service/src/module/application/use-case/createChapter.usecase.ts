import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  Collaboration,
  stateCollaboration,
} from '../../domaine/entities/collaboration.entity';
import {
  ProjectEntity,
  Visibility,
} from '../../domaine/entities/projectEntity';
import { CreateChapterDto } from 'src/module/adapter/dto/entrant/createChapter-dto';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';
import { ProjectMapper } from 'src/module/infrastructure/mapper/projectMapper';

@Injectable()
export class CreateChapterUsecase {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
     ) {}
  async execute(chapter: CreateChapterDto): Promise<any> {
    
    const project: ProjectEntity = await this.repository.findProjectById(
      chapter.project,
    );
    if (!project) throw new NotFoundException("this project doesn't exist");

    let response;

    if (project.getAuthor() == chapter.participantId) {
      response = await this.repository.createChapter(chapter);

      if (project.getVisibility() == Visibility.ONLYOWNERCANSEE) {
        project.setVisibility(Visibility.PUBLIC);
      }
    } else {
      const collaborators: Collaboration[] =
        await this.repository.getAllCollaborationByProject(chapter.project);

      const userIsCollab = collaborators.find(
        (c) => c.getUserId().toString() === chapter.participantId.toString(),
      );
      if (
        !userIsCollab ||
        userIsCollab.getStatus() != stateCollaboration.ACCEPTED
      )
        throw new UnauthorizedException(
          'Your are not allowed to update this project',
        );
      response = await this.repository.createChapter(chapter);
    }
    project.setChapterCount(1);
    await Promise.all([
      this.repository.saveProject(ProjectMapper.projectToProjectDocument(project)),
    ]);

    return response;
  }
}
