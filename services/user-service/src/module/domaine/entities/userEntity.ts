import { MediaType } from "src/lib/type/mediaType";

export enum LevelUser {
  NOVICE = 'NOVICE',
  ACTIF = 'ACTIF',
  EXPERT = 'EXPERT',
  GARDIEN = 'GARDIEN',
}

export enum StateUser {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  SUPRIMER = 'SUPPRIMER',
}

export class UserEntity {
  id: string;
  username: string;
  email: string;
  avatar_url?: MediaType;
  password: string;
  private state: StateUser = StateUser.ACTIVE;
  // Profil passion
  bio?: string;
  private skills: string[] = [];
  private level: LevelUser = LevelUser.NOVICE;
  private univerJointNumber: number = 0;
  private followerCount: number = 0;
  private followingCount: number = 0;
  private likeTotalCount: number = 0;
  private wiki_partisipation: number = 0;
  private reputation_score: number = 0;
  private projects_count: number = 0;
  private projectActif_count: number = 0;
  private help_given_count: number = 0;

  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  last_login: Date = new Date();

  constructor(params: {
    username: string;
    email: string;
    password: string;
    state?: StateUser;
    id: string;
    wiki_partisipation?: number;
    followerCount?: number;
    followingCount?: number;
    univerJointNumber?: number;
    likeTotalCount?: number;
    avatar_url?: MediaType;
    bio?: string;
    skills?: string[];
    level?: LevelUser;
    createdAt?: Date;
    updatedAt?: Date;
    last_login?: Date;
  }) {
    Object.assign(this, params);
  }
  getId() {
    return this.id;
  }
  getAvatarUrl() {
    return this.avatar_url;
  }
  setAVatarUrl(avatar: MediaType) {
    this.avatar_url = avatar;
  }
  getFollowerCount() {
    return this.followerCount;
  }
  setFollowingCount(value: number) {
    return (this.followingCount += value);
  }
  getuniverJointNumber() {
    return this.univerJointNumber;
  }
  setuniverJointNumber(value: number) {
    this.univerJointNumber += value;
  }
  getwiki_partisipation() {
    return this.wiki_partisipation;
  }
  setwiki_partisipation(value: number) {
    this.wiki_partisipation += value;
  }
  setFollowerCount(value: number) {
    return (this.followerCount += value);
  }
  setProjectActif_count(value: number) {
    this.projectActif_count += value;
  }
  getProjectActif_count() {
    return this.projectActif_count;
  }
  getFollowingCount() {
    return this.followingCount;
  }
  getLikeCount() {
    return this.likeTotalCount;
  }
  setLikeCount(value) {
    this.likeTotalCount += value;
  }

  getPassword() {
    return this.password;
  }
  getState() {
    return this.state;
  }
  getSkill() {
    return this.skills;
  }
  getHelpGiveCount() {
    return this.help_given_count;
  }
  getProjectCount() {
    return this.projects_count;
  }
  getreputation_score() {
    return this.reputation_score;
  }
  getLevel() {
    return this.level;
  }
  setLevel(level) {
    this.level = level;
  }

  setPassword(password: string): void {
    this.password = password;
  }
  setState(state) {
    this.state = state;
  }
  setSkill(skill, IsAdd: boolean = true) {
    IsAdd
      ? this.skills.push(skill)
      : this.skills.filter((c) => c.toLowerCase() == skill.toLowerCase());
  }
  setHelpGiveCount(help_given_count) {
    this.help_given_count += help_given_count;
  }
  setProjectCount(projects_c) {
    this.projects_count += projects_c;
  }
  setreputation_score(reputation_score) {
    this.reputation_score += reputation_score;
    if (this.reputation_score >= 2000) this.setLevel(LevelUser.GARDIEN);
    else if (this.reputation_score >= 500) this.setLevel(LevelUser.EXPERT);
    else if (this.reputation_score >= 99) this.setLevel(LevelUser.ACTIF);
    else this.setLevel(LevelUser.NOVICE);
  }

  updateReputationScore(newValue: number): number {
    this.reputation_score += newValue;
    return this.reputation_score;
  }
  updateProjectCount(type: 'DECREMENT' | 'INCREMENTE' = 'INCREMENTE'): number {
    type === 'DECREMENT'
      ? (this.projects_count -= 1)
      : (this.projects_count += 1);
    return this.projects_count;
  }
  updateHelpGiveCount(): number {
    this.help_given_count += 1;
    return this.help_given_count;
  }

  updateLastLogin(): Date {
    this.last_login = new Date();
    return this.last_login;
  }

  updateLevel(level: LevelUser): string {
    this.level = level;
    return this.level;
  }

  updateBio(newBio: string) {
    this.bio = newBio;
    this.updatedAt = new Date();
  }
}
