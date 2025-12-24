import { LevelUser, MediaType } from "src/lib/type";

export enum univerStatus {
  ACTIF = 'ACTIF',
  INACTIF = 'INACTIF',
  DELETE = 'DELETE',
}

export enum UniverVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
export class UniverEntity {
  private id: string;
  name: string;
  description?: string;
  logo?: MediaType;
  baner?: MediaType;
  private status: univerStatus = univerStatus.ACTIF;
  private visibility: UniverVisibility = UniverVisibility.PUBLIC;

  private state: {
    numberOfMember: number;
    numberOfProject: number;
    numberOfExpert: number;
    numberOfModerator: number;
    mediaCount: number;
  } = {
    numberOfMember: 0,
    numberOfProject: 0,
    numberOfExpert: 0,
    numberOfModerator: 0,
    mediaCount: 0,
  };

  private createdBy: string;

  private rules: {
    codeOfConduct: string;
    expertiseLevelREquired: LevelUser;
  };

  lastActivityAt: Date = new Date();

  createdAt: Date;
  updateAt: Date;

  constructor(params: {
    id: string;
    name: string;
    createdBy: string;
    createdAt: Date;
    updateAt: Date;
    description?: string;
    logo?: MediaType;
    baner?: MediaType;
    status?: univerStatus;
    visibility?: UniverVisibility;
    state?: {
      numberOfMember: number;
      numberOfProject: number;
      numberOfExpert: number;
      numberOfModerator: number;
      mediaCount: number;
    };

    rules?: {
      codeOfConduct?: string;
      expertiseLevelREquired?: LevelUser;
    };
    lastActivityAt?: Date;
  }) {
    Object.assign(this, params);
  }

  getMediaCount() {
    return this.state.mediaCount;
  }
  getId() {
    return this.id;
  }
  getCodeOfConduit() {
    return this.rules.codeOfConduct;
  }
  getVisibility() {
    return this.visibility;
  }
  setVisibility(visibility: UniverVisibility) {
    this.visibility = visibility;
  }
  setBanier(banier: MediaType) {
    this.baner = banier;
  }
  setLogo(logo: MediaType) {
    this.logo = logo;
  }
  getStatus() {
    return this.status;
  }

  setStatus(status: univerStatus) {
    this.status = status;
  }
  getCreatedBy() {
    return this.createdBy;
  }
  getRule() {
    return this.rules;
  }
  setRule(rule: { codeOfConduct: string; expertiseLevelREquired: LevelUser }) {
    this.rules = rule;
  }
  setCodeOfConduct(code: string) {
    this.rules.codeOfConduct = code;
  }
  setExpertiseRequired(expertiseLevelREquired: LevelUser) {
    this.rules.expertiseLevelREquired = expertiseLevelREquired;
  }
  getState() {
    return this.state;
  }
  setNumberOfMember(value: number) {
    this.state.numberOfMember += value;
  }

  setnumberOfProject(value: number) {
    this.state.numberOfProject += value;
  }
  setExpert(value: number) {
    this.state.numberOfExpert += value;
  }
  setModeration(value: number) {
    this.state.numberOfModerator += value;
  }

  getNumberOfMember() {
    return this.state.numberOfMember;
  }

  getnumberOfProject() {
    return this.state.numberOfProject;
  }
  getExpert() {
    return this.state.numberOfExpert;
  }
  getModeration() {
    return this.state.numberOfModerator;
  }
}
