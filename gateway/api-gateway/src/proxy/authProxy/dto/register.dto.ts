import { ApiProperty } from '@nestjs/swagger';

export class RegistryDto {
  @ApiProperty()
  pseudo: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
