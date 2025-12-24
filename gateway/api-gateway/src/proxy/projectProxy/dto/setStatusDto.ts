import { ApiProperty } from '@nestjs/swagger';

export class SetStatusProjectDto {
  @ApiProperty()
  participantId: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  status: number;
}
