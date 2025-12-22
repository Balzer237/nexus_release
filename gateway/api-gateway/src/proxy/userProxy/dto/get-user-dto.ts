export enum LevelUser {
  NOVICE = 'NOVICE',
  ACTIF = 'ACTIF',
  EXPERT = 'EXPERT',
  GARDIEN = 'GARDIEN',
}
export class GetUserDto {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  skills?: string[];
  reputation_score: number;
  projects_count: number;
  help_given_count: number;
  level: LevelUser;
}
