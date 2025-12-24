
import { MediaType } from "src/lib/type";
import { ParticipantStatus, ParticipentType } from "src/module/domaine/entities/participantEntity";
import { UniverEntity, univerStatus, UniverVisibility } from "src/module/domaine/entities/universEntiy";

export class UniverSortantDto {
  id: string;
  name: string;
  description?: string;
  logo?: MediaType;
  baner?: MediaType;
  status: univerStatus;
  visibility: UniverVisibility;
  numberOfMember: number;
  numberOfProject: number;
  numberOfModerator: number;
  numberOfExpert: number;
  mediaCount: number;
  createdBy: string;
  codeOfConduct?: string;
  expertiseLevelREquired?: any;
  lastActivityAt: Date;
  createdAt: Date;
  updateAt: Date;
}

export class ParticipantSortantDto {
  id: string;
  type: ParticipentType;
  level: any;
  status: ParticipantStatus;

  reputationPoint: number;
  lastActivity: Date;

  postCount: number;
  projectCount: number;
  chapterCount: number;
  wikiEditCount: number;

  univer: UniverEntity;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}
