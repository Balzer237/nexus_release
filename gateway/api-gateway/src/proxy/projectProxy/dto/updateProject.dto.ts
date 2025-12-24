import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDTo {
  @ApiProperty()
  participantId: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}
