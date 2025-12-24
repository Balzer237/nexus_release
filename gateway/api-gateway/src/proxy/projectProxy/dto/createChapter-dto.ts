import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateChapterDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsString()
  project: string;

  @ApiProperty()
  @IsString()
  userId: string;

  organization?: {
    order: number;
  };
}
