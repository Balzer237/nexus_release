import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ParticipentEntity } from 'src/module/domaine/entities/participantEntity';
import { UniverVisibility } from 'src/module/domaine/entities/universEntiy';
import { RepositoryInterface } from 'src/module/domaine/repository/repositoryInterface';

//utiliser en interne
@Injectable()
export class GetUniversByIdUsecase {
  constructor(
    @Inject('MongooseRepository')
    private readonly service: RepositoryInterface,
  ) {}

  async execute(data: any) {
    const univer = await this.service.getUniverById(data);

    if (!univer) throw new NotFoundException('Univer not found');
    return univer;
  }
}

//retourner au client
@Injectable()
export class GetUniversByIdToUserUsecase {
  constructor(
    @Inject('MongooseRepository')
    private readonly service: RepositoryInterface,
  ) {}

  async execute(data: string, userId: string) {
    const univer = await this.service.getUniverById(data);

    if (!univer) throw new NotFoundException('Univer not found');

    const participant: ParticipentEntity | null =
      await this.service.findParticipantByUserAndUniver(userId, data);
    if (participant) {
      const data = {
        ...univer,
        participant: {
          ...participant,
        },
      };
      return data;
    }
    if (univer.getVisibility() == UniverVisibility.PUBLIC) {
      return univer;
    }
    throw new UnauthorizedException('Not authorize');
  }
}
