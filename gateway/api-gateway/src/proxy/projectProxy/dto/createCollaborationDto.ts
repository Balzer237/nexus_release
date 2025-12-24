import { ApiProperty } from '@nestjs/swagger';
import { CollaboratorRole } from '../type';

export class createCollaborationDto {
  @ApiProperty()
  projectId: string;

  @ApiProperty()
  senderId: string;

  @ApiProperty()
  receiverId: string;

  @ApiProperty()
  role: CollaboratorRole;
}
