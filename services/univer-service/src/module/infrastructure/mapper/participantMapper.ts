import { ParticipantSortantDto } from 'src/module/adapter/dto/sortant/AllDtoSortant.dto';
import { ParticipentEntity } from '../../domaine/entities/participantEntity';
import { Types } from 'mongoose';


export class ParticipantMapper{ 
    static ParticipantToParticipantDocument(
  participant: ParticipentEntity,
) {
  return {
    _id: new Types.ObjectId(participant.getId()),
    univerId: new Types.ObjectId(participant.getUniver().getId()),
    userId: new Types.ObjectId(participant.getUser()),
    type: participant.getType(),
    level: participant.getLevel(),
    status: participant.getStatus(),
    reputationPoint: participant.getReputationPoint(),
    lastActivity: participant.lastActivity,
    activity: participant.getActivity(),
    createdAt: participant.createAt,
    updatedAt: participant.updateAt,
  };
}

static ParticipantDocumentToParticipant(
  document: any,
): ParticipentEntity {
  return new ParticipentEntity({
    id: document._id.toString(),
    type: document.type,
    level: document.level,
    status: document.status,
    reputationPoint: document.reputationPoint,
    lastActivity: document.lastActivity,
    activity: document.activity,
    univer: document.univerId,
    user: document.userId,
    createAt: document.createdAt,
    updateAt: document.updatedAt,
  });
}

static ParticipantEntityToSortant(
  entity: ParticipentEntity,
): ParticipantSortantDto {
  return {
    id: entity.getId(),
    type: entity.getType(),
    level: entity.getLevel(),
    status: entity.getStatus(),

    reputationPoint: entity.getReputationPoint(),
    lastActivity: entity.lastActivity,

    postCount: entity.getPostCount(),
    projectCount: entity.getActivity().projectCount,
    chapterCount: entity.getActivity().chapterCount,
    wikiEditCount: entity.getActivity().wikiEditCount,

    univer: entity.getUniver(),
    user: entity.getUser(),
    createdAt: entity.createAt,
    updatedAt: entity.updateAt,
  };
}
}