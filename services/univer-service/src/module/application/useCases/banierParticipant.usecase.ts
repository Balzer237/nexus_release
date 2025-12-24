import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BanirPartivipantDto } from 'src/module/adapter/dto/entrant/banirParticipant.dto';
import { ParticipantStatus } from 'src/module/domaine/entities/participantEntity';
import { RepositoryInterface } from 'src/module/domaine/repository/repositoryInterface';
import { ParticipantMapper } from 'src/module/infrastructure/mapper/participantMapper';

@Injectable()
export class BanirPartivipantUsecase {
  constructor(
    @Inject('MongooseRepository')
    private readonly service: RepositoryInterface,
  ) {}

  async execute(data: BanirPartivipantDto) {
    const participant = await this.service.getParticipantById(
      data.participantId,
    );

    //ici on verifie que celui connecter a le nivea necessaire pour banir
    if (!participant) throw new NotFoundException('Participant not found');
    participant.setStatus(ParticipantStatus .BANIE);

    return await this.service.saveParticipant(
       ParticipantMapper.ParticipantToParticipantDocument(participant),
    );
  }
}
