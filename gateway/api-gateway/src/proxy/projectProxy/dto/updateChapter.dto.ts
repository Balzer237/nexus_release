import { ApiProperty } from '@nestjs/swagger';

export class UpdateChapterDTo {
  @ApiProperty()
  chapterId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}
