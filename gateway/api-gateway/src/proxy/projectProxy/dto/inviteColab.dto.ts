import { ApiProperty } from '@nestjs/swagger';

export class InviteColabDto {
  @ApiProperty()
  projectId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  invitedById: string;
}

export class ResponseToCollaboration {
  @ApiProperty()
  collaborationId: string;

  @ApiProperty()
  responce: number;
}
