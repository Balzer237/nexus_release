import { ApiProperty } from '@nestjs/swagger';
import { LevelUser } from 'src/proxy/userProxy/dto/get-user-dto';

export class CreateUniversDto {
  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  codeOfConduct: string;

  @ApiProperty({
    description: `level minimal pour acceder ${LevelUser.ACTIF},${LevelUser.NOVICE},${LevelUser.GARDIEN},${LevelUser.EXPERT}`,
  })
  expertiseLevelREquired: LevelUser;
}
