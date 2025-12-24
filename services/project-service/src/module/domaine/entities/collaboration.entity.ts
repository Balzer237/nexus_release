import { CollaboratorRole, ProjectEntity } from './projectEntity';

export enum stateCollaboration {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  ANNULER = 'ANNULER',
  DELETE = 'DELETE',
}

export class Collaboration {
  private id: string;
  private project: ProjectEntity;
  private sender: string;
  private status: stateCollaboration;
  private receiver: string;
  private role: CollaboratorRole;
  invitedAt: Date = new Date();
  respondedAt?: Date;
  expiredAt: Date | null;

  constructor(params: {
    id: string;
    project: ProjectEntity;
    sender: number;
    status: stateCollaboration;
    receiver: number;
    role: CollaboratorRole;
    invitedAt: string;
    respondedAt?: Date;
    expiredAt: Date;
  }) {
    Object.assign(this, params);
  }

  // Getter / Setter
  getId(): string {
    return this.id;
  }

  getStatus() {
    return this.status;
  }
  setStatus(data: stateCollaboration) {
    this.status = data;
  }
  getRole() {
    return this.role;
  }
  setRole(role: CollaboratorRole) {
    this.role = role;
  }

  getProject(): ProjectEntity {
    return this.project;
  }

  setProjectId(project: ProjectEntity) {
    this.project = project;
  }

  getUserId(): string {
    return this.receiver;
  }

  setUserId(user: string) {
    this.receiver = user;
  }

  getInvitedBy(): string {
    return this.sender;
  }

  setInvitedBy(invitedBy: string) {
    this.sender = invitedBy;
  }
}
