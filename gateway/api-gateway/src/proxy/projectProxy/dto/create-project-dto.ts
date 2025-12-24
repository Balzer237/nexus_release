import { ApiProperty } from '@nestjs/swagger';
import { ProjectDifficulty } from '../type';

export class CreateProjectDto {
  @ApiProperty({ description: 'titre du projet' })
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  Author: string;

  @ApiProperty()
  univer: string;

  @ApiProperty()
  dificulty: ProjectDifficulty;
}
