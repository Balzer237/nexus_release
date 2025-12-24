import { ApiProperty } from '@nestjs/swagger';

export class UpdateRuleUNiverDto {
  @ApiProperty()
  univerId: string;

  @ApiProperty()
  userId: string;
  @ApiProperty()
  rule: string;
}
