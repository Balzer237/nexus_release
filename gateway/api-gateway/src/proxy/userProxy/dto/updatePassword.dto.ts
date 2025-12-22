import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty()
  allPassword: string;

  @ApiProperty()
  newPassword: string;
}
