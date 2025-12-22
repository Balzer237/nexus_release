import { ApiProperty } from '@nestjs/swagger';

export class suspendUserDto {
  @ApiProperty()
  reason: string;

  @ApiProperty()
  duration?: number;
}
