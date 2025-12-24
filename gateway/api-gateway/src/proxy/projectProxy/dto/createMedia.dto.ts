import { ApiProperty } from '@nestjs/swagger';

export class CreateMediaDto {
  @ApiProperty({ description: 'id du chapitre' })
  chapter: string;

  @ApiProperty({ description: 'id du project' })
  project: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiProperty()
  uploadedBy: string;

  @ApiProperty()
  title?: string;

  @ApiProperty()
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
