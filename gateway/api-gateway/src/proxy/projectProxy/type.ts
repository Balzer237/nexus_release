
export enum Visibility {
  ONLYOWNERCANSEE = 'ONLYOWNERCANSEE',
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  CONTRUBUABLE = 'CONTRIBUABLE',
}
export enum StatusProject {
  END = 'END',
  IDEA = 'IDEA',
  IN_PROGRESS = 'IN_PROGRESS',
  PAUSE = 'PAUSE',
  ABBANDONER = 'ABANDONNER',
  DELETE = 'DELETE',
}

export enum ProjectDifficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  EXPERT = 'EXPERT',
}
export enum CollaboratorRole {
  AUTHOR = 'AUTHOR',
  CONTRIBUTOR = 'CONTRIBUTOR',
  REVIEWER = 'REVIEWER',
  READER = 'READER',
}

export enum stateCollaboration {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  ANNULER = 'ANNULER',
  DELETE = 'DELETE',
}

export enum CommentType {
  COMMENT = 'COMMENT',
  QUESTION = 'QUESTION',
  SUGGESTION = 'SUGGESTION',
}