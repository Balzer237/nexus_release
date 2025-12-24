import { ApiProperty } from '@nestjs/swagger';

export class SetVisibilityDTO {
  @ApiProperty()
  idUniver: string;

  @ApiProperty()
  participantId: string;

  @ApiProperty()
  visibility: number;
}
