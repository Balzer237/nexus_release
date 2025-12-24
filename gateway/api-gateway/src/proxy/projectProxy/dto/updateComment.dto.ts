import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDTO {
  @ApiProperty({ required: true })
  commentId: string;

  @ApiProperty()
  content: string;
}
