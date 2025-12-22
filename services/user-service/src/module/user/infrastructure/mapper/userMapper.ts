import { UserSortantDto } from "src/module/user/adapter/dto/sortant/AllDtoSortant.dto";
import { LevelUser, StateUser, UserEntity } from "src/module/user/domaine/entities/userEntity";

export class UserMapper{
  static documentToEntity(document: any): UserEntity {
    const user = new UserEntity({
      id: document._id.toString(),
      username: document.username,
      password: document.password,
      email: document.email,
      wiki_partisipation: document.wiki_partisipation,
      followerCount: document.followerCount,
      followingCount: document.followingCount,
      likeTotalCount: document.likeTotalCount,
      univerJointNumber: document.univerJointNumber,
      avatar_url: document.avatar_url,
      bio: document.bio,
      skills: document.skills ?? [],
      level: document.level ?? LevelUser.NOVICE,
    });

    //user.subscribed_universes = document.subscribed_universes ?? [];
    user.setState(document.state as StateUser);
    user.setPassword(document.password);
    user.setreputation_score(document.reputation_score ?? 0);
    user.setProjectCount(document.projects_count ?? 0);
    user.setHelpGiveCount(document.help_given_count ?? 0);
    user.setProjectActif_count(document.projectActif_count ?? 0);
    user.createdAt = document.createdAt ?? new Date();
    user.updatedAt = document.updatedAt ?? new Date();
    user.last_login = document.last_login ?? new Date();

    return user;
  }


  static entityToDocument(entity: UserEntity): any {
    return {
      _id: entity.id,
      username: entity.username,
      email: entity.email,
      followerCount: entity.getFollowerCount(),
      followingCount: entity.getFollowingCount(),
      likeTotalCount: entity.getLikeCount(),
      avatar_url: entity.avatar_url,
      bio: entity.bio,
      univerJointNumber: entity.getuniverJointNumber(),
      wiki_partisipation: entity.getwiki_partisipation(),
      skills: entity.getSkill(),
      level: entity.getLevel(),
      password: entity.getPassword(),
      state: entity.getState(),
      reputation_score: entity.getreputation_score(),
      projects_count: entity.getProjectCount(),
      help_given_count: entity.getHelpGiveCount(),
      last_login: entity.last_login,
      projectActif_count: entity.getProjectActif_count(),
    };
  }

  static userEntityToEntitySortant(entity: UserEntity): UserSortantDto {
    return {
      id: entity.getId(),
      email: entity.email,
      userName: entity.username,
      avatar: entity.avatar_url,
      state: entity.getState(),
      bio: entity.bio,
      skills: entity.getSkill(),
      level: entity.getLevel(),
      univerJointNumber: entity.getuniverJointNumber(),
      followerCount: entity.getFollowerCount(),
      followingCOunt: entity.getFollowingCount(),
      likeTotalCount: entity.getLikeCount(),
      wiki_partisipation: entity.getwiki_partisipation(),
      reputation_score: entity.getreputation_score(),
      projects_count: entity.getProjectCount(),
      projectActif_count: entity.getProjectActif_count(),
      help_given_count: entity.getHelpGiveCount(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      last_login: entity.last_login,
    };
  }
}



