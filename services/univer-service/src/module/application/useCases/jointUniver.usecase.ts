import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LevelUser } from 'src/lib/type';
import { joinUniverDto } from 'src/module/adapter/dto/entrant/joinUniver.dto';
import { ParticipantStatus, ParticipentEntity, ParticipentType } from 'src/module/domaine/entities/participantEntity';
import { UniverEntity } from 'src/module/domaine/entities/universEntiy';
import { RepositoryInterface } from 'src/module/domaine/repository/repositoryInterface';
import { UniverMapper } from 'src/module/infrastructure/mapper/univerMapper';

@Injectable()
export class JointUniversUsecase {
  constructor(
    @Inject('MongooseRepository')
    private readonly repository: RepositoryInterface,
  ) {}

  async execute(data: joinUniverDto) {
    const univer: UniverEntity = await this.repository.getUniverById(
      data.univerId,
    );
    if (!univer)
      throw new NotFoundException("This univers doesn't exist or deleted");

    const allReadyParticipant =
      await this.repository.findParticipantByUserAndUniver(
        data.userId,
        univer.getId(),
      );
    if (allReadyParticipant)
      throw new ConflictException('You already in this univers');

    const dataEnrichie = {
      userId: data.userId,
      univerId: data.univerId,
      type: ParticipentType.MEMBER,
      level: LevelUser.NOVICE,
      status: ParticipantStatus.ACTIF,
    };
    const Participent: ParticipentEntity =
      await this.repository.rejoindreUnivers(dataEnrichie);
    univer.setNumberOfMember(1);

    await this.repository.saveUniver(UniverMapper.UniversToUniversDocument(univer));
    
    return Participent;
  }
}
