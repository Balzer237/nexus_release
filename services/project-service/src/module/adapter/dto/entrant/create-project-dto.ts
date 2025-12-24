import { ProjectDifficulty } from "src/module/domaine/entities/projectEntity";

export class CreateProjectDto {
  title: string;

  description: string;

  user:any;
  Author: string;

  univer: string;

  dificulty: ProjectDifficulty;
}
