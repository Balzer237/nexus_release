import { ApiProperty } from '@nestjs/swagger';

export class BanirPartivipantDto {
  @ApiProperty()
  participantId: string;

  @ApiProperty()
  univerId: string;
}
