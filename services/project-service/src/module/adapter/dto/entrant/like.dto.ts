
export enum likeType {
  COMMENT = 'COMMENT',
  PROJECT = 'PROJECT',
  CHAPTER = 'CHAPTER',
}
export class LikeDto {
  resourceId: string;

  type: number; // 0->comment ; 1->project et 2->chapter,
}
