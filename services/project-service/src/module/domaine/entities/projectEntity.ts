
export enum Visibility {
  ONLYOWNERCANSEE = 'ONLYOWNERCANSEE',
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  CONTRUBUABLE = 'CONTRIBUABLE',
}
export enum StatusProject {
  END = 'END',
  IDEA = 'IDEA',
  IN_PROGRESS = 'IN_PROGRESS',
  PAUSE = 'PAUSE',
  ABBANDONER = 'ABANDONNER',
  DELETE = 'DELETE',
}

export enum ProjectDifficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  EXPERT = 'EXPERT',
}
export enum CollaboratorRole {
  AUTHOR = 'AUTHOR',
  CONTRIBUTOR = 'CONTRIBUTOR',
  REVIEWER = 'REVIEWER',
  READER = 'READER',
}

export class ProjectEntity {
  private id: string;
  title: string;
  description?: string;
  private author: string;
  private visibility: Visibility = Visibility.PRIVATE;
  private univer: string;
  dificulty: ProjectDifficulty = ProjectDifficulty.BEGINNER;
  private status: StatusProject;
  private baniere: any;
  private collaborators: {
    user: string;
    role: CollaboratorRole;
    joinedAt: Date;
  }[] = [];

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
  private chapterCount: number = 0;
  completionRate: number = 0;
  gallery: number = 0;
  createAt: Date = new Date();
  updateAt: Date = new Date();
  completAt: Date | null;

  setting: {
    allowedCollaborator: number;
  } = {
    allowedCollaborator: 0,
  };

  constructor(params: {
    id: string;
    title: string;
    description?: string;
    author: string;
    univer: string;
    dificulty: ProjectDifficulty;
    status?: StatusProject;
    collaborators?: { user: string; role: CollaboratorRole; joinedAt: Date }[];
    statistique?: {
      commentCount: number;
      likeCount: number;
      shareCount: number;
      viewCount: number;
    };
    baniere?: any;
    likeCount?: number;
    visibility?: Visibility;
    gallery?: number;
    commentCount?: number;
    chapterCount?: number;
    completionRate?: number;
    createAt?: Date;
    updateAt?: Date;
    completAt?: Date;
    setting?: { allowedCollaborator: number };
  }) {
    Object.assign(this, params);
  }

  // Getter / Setter
  getId(): string {
    return this.id;
  }

  getAuthor(): string {
    return this.author;
  }
  setBaniere(banier: any) {
    this.baniere = banier;
  }

  getBaniere() {
    return this.baniere;
  }
  setAuthor(author: string) {
    this.author = author;
  }

  getVisibility(): Visibility {
    return this.visibility;
  }

  setVisibility(visibility: Visibility) {
    this.visibility = visibility;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setDescription(description: string) {
    this.description = description;
  }

  getUniver(): string {
    return this.univer;
  }

  setUniver(univer: string) {
    this.univer = univer;
  }

  getStatus(): StatusProject {
    return this.status;
  }

  setStatus(status: StatusProject) {
    this.status = status;
  }

  getChapterCount(): number {
    return this.chapterCount;
  }

  setChapterCount(count: number) {
    this.chapterCount += count;
  }

  getCollaborators() {
    return this.collaborators;
  }

  setGallery(gallery) {
    this.gallery = gallery;
  }
  getStatistique() {
    return this.statistique;
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
  deleteCollaboration(params: { user: string }) {
    const collab: any[] = this.collaborators.filter(
      (c) => c.user != params.user,
    );
    this.collaborators = collab;
  }
  setCollaborators(
    collaborators: {
      user: string;
      role: CollaboratorRole;
      joinedAt: Date;
    },
    type: 'UPDATE' | 'ADD' = 'ADD',
  ) {
    type === 'ADD' && this.collaborators.push(collaborators);
  }
}
