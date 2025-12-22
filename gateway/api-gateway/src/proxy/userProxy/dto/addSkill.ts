import { ApiProperty } from '@nestjs/swagger';

export class AddSkillsDto {
  @ApiProperty({ description: 'Nouvelle compétence à ajouter' })
  description: string;
}
