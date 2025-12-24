import { ApiProperty } from '@nestjs/swagger';

export class joinUniverDto {
  @ApiProperty()
  univerId: string;

  @ApiProperty()
  userId: string;
}
