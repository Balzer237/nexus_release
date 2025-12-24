import { ChapterEntity } from './chapter.entity';
import { ProjectEntity } from './projectEntity';

export class MediaEntity {
  private id: string;

  chapter: ChapterEntity;
  project: ProjectEntity;
  private uploadedBy: string;

  filename: string;
  originalName: string;

  title?: string;
  description?: string;
  type: string;

  dimention?: {
    width: number;
    height: number;
  };

  size: number;
  storagePath: string;
  duration?: number;
  thumbnails?: string;
  format: string;

  createAt: Date = new Date();
  updateAt: Date = new Date();

  constructor(params: {
    id: string;
    chapter: ChapterEntity;
    project: ProjectEntity;
    uploadedBy: string;
    filename: string;
    originalName: string;
    type: string;
    dimention?: { width: number; height: number };
    size: number;
    storagePath: string;
    duration?: number;
    thumbnails?: string;
    format: string;
    title?: string;
    description?: string;
    createAt?: Date;
    updateAt?: Date;
  }) {
    Object.assign(this, params);
  }

  // Getter / Setter
  getId(): string {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
  }

  getUploadedBy(): string {
    return this.uploadedBy;
  }

  setUploadedBy(userId: string) {
    this.uploadedBy = userId;
  }
}
