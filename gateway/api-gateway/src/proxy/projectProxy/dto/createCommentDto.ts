import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CommentType } from '../type';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  type: CommentType;

  @ApiProperty()
  content: string;

  @ApiProperty()
  parentComment?: string;

  @ApiProperty()
  author: string;

  @ApiProperty({ description: 'ProjectId' })
  projectId: string;

  @ApiProperty({ description: 'chapter id (optionnel)' })
  chapterId: string;
}
