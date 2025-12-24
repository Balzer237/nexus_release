
export class CreateMediaDto {
  chapter: string;

  project: string;

  file: any;

  uploadedBy: string;

  title?: string;

  description?: string;

  type?: string;
  dimention?: { width: number; height: number };
  size: number;
  storagePath: string;
  thumbnails: string;
  format: string;
  originalName: string;
  filename: string;
}
