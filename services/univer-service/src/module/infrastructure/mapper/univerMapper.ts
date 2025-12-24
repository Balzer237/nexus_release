import { UniverSortantDto } from 'src/module/adapter/dto/sortant/AllDtoSortant.dto';
import { UniverEntity } from '../../domaine/entities/universEntiy';
import { Types } from 'mongoose';

export class UniverMapper{

static UniversToUniversDocument(univer: UniverEntity) {
  return {
    _id: univer.getId(),
    name: univer.name,
    description: univer.description,
    logo: univer.logo,
    baner: univer.baner,
    status: univer.getStatus(),
    state: univer.getState(),
    lastActivityAt: univer.lastActivityAt,
    rule: univer.getRule(),
    createdBy: new Types.ObjectId(univer.getCreatedBy()),
    visibility: univer.getVisibility(),
  };
}

static UniverDocumenToUniver(document: any): UniverEntity {
  return new UniverEntity({
    id: document._id,
    baner: document.baner,
    createdAt: document.createdAt,
    createdBy: document.createdBy.toString(),
    name: document.name,
    description: document.description,
    logo: document.logo,
    state: document.state,
    status: document.status,
    visibility: document.visibility,
    rules: document.rules,
    lastActivityAt: document.lastActivityAt,
    updateAt: document.updatedAt,
  });
}

static UniverEntityToSortant(entity: UniverEntity): UniverSortantDto {
  return {
    id: entity.getId(),
    name: entity.name,
    description: entity.description,
    logo: entity.logo,
    baner: entity.baner,
    status: entity.getStatus(),
    visibility: entity.getVisibility(),
    numberOfMember: entity.getNumberOfMember(),
    numberOfProject: entity.getnumberOfProject(),
    numberOfModerator: entity.getModeration(),
    numberOfExpert: entity.getExpert(),
    mediaCount: entity.getMediaCount(),
    createdBy: entity.getCreatedBy(),
    codeOfConduct: entity.getRule().codeOfConduct,
    expertiseLevelREquired: entity.getRule().expertiseLevelREquired,
    lastActivityAt: entity.lastActivityAt,
    createdAt: entity.createdAt,
    updateAt: entity.updateAt,
  };
}
}