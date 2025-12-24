import { Inject, Injectable } from '@nestjs/common';
import { ParticipentEntity } from 'src/module/domaine/entities/participantEntity';
import { RepositoryInterface } from 'src/module/domaine/repository/repositoryInterface';
import { ParticipantMapper } from 'src/module/infrastructure/mapper/participantMapper';

@Injectable()
export class SaveParticipantUseCase {
  constructor(
    @Inject('MongooseRepository')
    private readonly repository: RepositoryInterface,
  ) {}

  async execute(data: ParticipentEntity) {
    return await this.repository.saveParticipant(
     ParticipantMapper.ParticipantToParticipantDocument(data),
    );
  }
}
