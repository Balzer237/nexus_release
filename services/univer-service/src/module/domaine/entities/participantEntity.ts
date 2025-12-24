
import { LevelUser } from 'src/lib/type';
import { UniverEntity } from './universEntiy';

export enum ParticipentType {
  MEMBER = 'MEMBER',
  CONTRIBUTOR = 'CONTRIBUTOR',
  EXPERT = 'PRO',
  GARDIENT = 'GARDIENT',
}
export enum ParticipantStatus {
  ACTIF = 'ACTIF',
  BANIE = 'BANIE',
}
export class ParticipentEntity {
  id: string;
  private type: ParticipentType = ParticipentType.MEMBER;
  private level: LevelUser = LevelUser.ACTIF;
  private status: ParticipantStatus = ParticipantStatus.ACTIF;

  private reputationPoint: number = 0;
  lastActivity: Date = new Date();
  private activity: {
    postCount: number;
    projectCount: number;
    chapterCount: number;
    wikiEditCount: number;
  } = {
    postCount: 0,
    projectCount: 0,
    chapterCount: 0,
    wikiEditCount: 0,
  };

  private univer: UniverEntity;
  private user: string;

  createAt: Date;
  updateAt: Date;

  constructor(params: {
    id: string;
    type: ParticipentType;
    level: LevelUser;
    status: ParticipantStatus;

    reputationPoint: number;
    lastActivity?: Date;
    activity: {
      postCount: number;
      projectCount: number;
      chapterCount: number;
      wikiEditCount: number;
    };

    univer: UniverEntity;
    user: string;

    createAt: Date;
    updateAt: Date;
  }) {
    Object.assign(this, params);
  }

  setPostCount(value: number) {
    this.activity.postCount += value;
  }
  setProjectCount(value: number) {
    this.activity.projectCount += value;
  }
  setChapterCount(value: number) {
    this.activity.chapterCount += value;
  }
  setWikiEdition(value: number) {
    this.activity.wikiEditCount += value;
  }

  getType() {
    return this.type;
  }
  getId() {
    return this.id;
  }
  getLevel() {
    return this.level;
  }
  getStatus() {
    return this.status;
  }
  getReputationPoint() {
    return this.reputationPoint;
  }
  getPostCount() {
    return this.activity.postCount;
  }
  getActivity() {
    return this.activity;
  }
  getUniver() {
    return this.univer;
  }
  getUser() {
    return this.user;
  }

  setType(type: ParticipentType) {
    this.type = type;
  }
  setLevel(level: LevelUser) {
    this.level = level;
  }
  setStatus(state: ParticipantStatus) {
    this.status = state;
  }
  setReputationPoint(value) {
    this.reputationPoint += value;
  }
}
