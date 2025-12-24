import { ClientSession } from 'mongoose';
import { ParticipentEntity } from '../entities/participantEntity';
import { UniverEntity } from '../entities/universEntiy';
import { FindAllUserUniversDto } from 'src/module/adapter/dto/entrant/findAllUserUniver.dto';
import { UniverResponse } from 'src/module/infrastructure/mongoose/repositoryMongooseImplementation';
import { Participant } from 'src/module/infrastructure/mongoose/schema/participantSchema';

export abstract class RepositoryInterface {
  abstract createUniver(
    data: any,
    options?: { session?: ClientSession },
  ): Promise<any>;
  abstract getUniverById(idUniver: string): Promise<UniverEntity>;
  abstract rejoindreUnivers(
    data: any,
    options?: { session?: ClientSession },
  ): Promise<any>;
  abstract createDefi(data: any): Promise<any>;
  abstract getAllUniverUserJoined(
    data: FindAllUserUniversDto,
  ): Promise<UniverResponse>;
  abstract getAllUnivers(data: any): Promise<UniverResponse>;
  abstract getPopulareUniver(data: any): Promise<any>;
  abstract saveUniver(data: any): Promise<any>;
  abstract saveParticipant(data: Participant): Promise<any>;
  abstract getParticipantById(id: string): Promise<ParticipentEntity | null>;
  abstract findParticipantByUserAndUniver(
    userId: string,
    univerId: string,
  ): Promise<ParticipentEntity | null>;
}
