import { ApiProperty } from '@nestjs/swagger';
import { stateCollaboration } from '../type';

export class ChangeStatusCollaborationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  senderId: string;

  @ApiProperty()
  status: stateCollaboration;
}
