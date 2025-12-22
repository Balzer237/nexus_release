import { ApiProperty } from '@nestjs/swagger';

export class AddSPointsDto {
  @ApiProperty({ description: 'Point(s) à ajouter' })
  value: number;
}
