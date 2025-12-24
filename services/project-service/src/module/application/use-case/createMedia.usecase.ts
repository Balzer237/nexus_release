import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ChapterEntity } from '../../domaine/entities/chapter.entity';
import {
  Collaboration,
  stateCollaboration,
} from '../../domaine/entities/collaboration.entity';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';
import { CreateMediaDto } from 'src/module/adapter/dto/entrant/createMedia.dto';
import { ChapterMapper } from 'src/module/infrastructure/mapper/chapterMapper';

@Injectable()
export class CreateMediaUseCase {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
   ) {}
  async execute(data: CreateMediaDto): Promise<any> {
    
    const chapter: ChapterEntity = await this.repository.findChapterById(
      data.chapter,
    );

    if (!chapter) throw new NotFoundException("This chapter doesn't exis");
    if (data.uploadedBy != chapter.getParticipant().toString()) {
      const collaborators: Collaboration[] =
        await this.repository.getAllCollaborationByProject(
          chapter.getProject().getId(),
        );
      const userIsCollab = collaborators.find(
        (c) => c.getUserId() == data.uploadedBy,
      );
      if (
        !userIsCollab ||
        userIsCollab.getStatus() != stateCollaboration.ACCEPTED
      )
        throw new UnauthorizedException(
          'Your a not able to update this project',
        );
    }
    const response = await this.repository.createMedia(data);
    chapter.setMediaCount(1);
    await this.repository.saveChapter(ChapterMapper.chapterToChapterDocument(chapter));
    return response;
  }
}
