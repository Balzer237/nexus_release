
import { MediaType } from 'src/lib/type/mediaType';
import { LevelUser, StateUser } from 'src/module/domaine/entities/userEntity';

export class UserSortantDto {
  id: string;
  userName: string;
  email: string;
  avatar?: MediaType;
  state: StateUser;
  bio?: string;
  skills?: string[];
  level: LevelUser;
  univerJointNumber: number;
  followerCount: number;
  followingCOunt: number;
  likeTotalCount: number;
  wiki_partisipation: number;
  reputation_score: number;
  projects_count: number;
  projectActif_count: number;
  help_given_count: number;
  createdAt: Date;
  updatedAt: Date;
  last_login: Date;
}
