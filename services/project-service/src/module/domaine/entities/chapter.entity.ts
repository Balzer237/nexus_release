import { ProjectEntity } from './projectEntity';

export enum chapterStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
}
export class ChapterEntity {
  private id: string;
  description?: string;
  title: string;
  private MediaCount: number = 0;
  private project: ProjectEntity;
  private participant: string;

  private organization: {
    order: number;
  };

  private status: chapterStatus = chapterStatus.DRAFT;

  updateAt: Date = new Date();
  createAt: Date = new Date();
  publichedAt?: Date;

  private statistique: {
    commentCount: number;
    likeCount: number;
    shareCount: number;
    viewCount: number;
  } = {
    commentCount: 0,
    likeCount: 0,
    shareCount: 0,
    viewCount: 0,
  };

  constructor(params: {
    id: string;
    description?: string;
    title: string;
    project: ProjectEntity;
    participant: number;
    organization: { order: number };
    MediaCount?: number;
    statistique?: {
      commentCount: number;
      likeCount: number;
      shareCount: number;
      viewCount: number;
    };
    status?: chapterStatus;
    updateAt?: Date;
    createAt: Date;
    publichedAt?: Date;
  }) {
    Object.assign(this, params);
  }

  // Getter / Setter
  getId(): string {
    return this.id;
  }
  getParticipant(): string {
    return this.participant;
  }
  getStatistique() {
    return this.statistique;
  }
  getMediaCount() {
    return this.MediaCount;
  }
  setMediaCount(value: number) {
    this.MediaCount += value;
  }
  setCommentCount(value: number) {
    this.statistique.commentCount += value;
  }
  setLikeCount(value: number) {
    this.statistique.likeCount += value;
  }
  setShareCount(value: number) {
    this.statistique.shareCount += value;
  }
  setViewCount(value: number) {
    this.statistique.viewCount += value;
  }

  setId(id: string) {
    this.id = id;
  }

  getProject(): ProjectEntity {
    return this.project;
  }

  setProject(project: ProjectEntity) {
    this.project = project;
  }

  getOrganization(): { order: number } {
    return this.organization;
  }

  setOrganization(organization: { order: number }) {
    this.organization = organization;
  }

  getStatus(): chapterStatus {
    return this.status;
  }

  setStatus(status: chapterStatus) {
    this.status = status;
  }
}
