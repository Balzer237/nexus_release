import { ApiProperty } from '@nestjs/swagger';

export enum likeType {
  COMMENT = 'COMMENT',
  PROJECT = 'PROJECT',
  CHAPTER = 'CHAPTER',
}
export class LikeDto {
  @ApiProperty()
  resourceId: string;

  @ApiProperty({ description: ' 0->comment ; 1->project et 2->chapter' })
  type: number; // 0->comment ; 1->project et 2->chapter,
}
