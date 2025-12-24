import { ApiProperty } from '@nestjs/swagger';

export class SetVisibilityProjectDto {
  @ApiProperty()
  participantId: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  visibility: number;
}
