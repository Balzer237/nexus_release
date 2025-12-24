import { Injectable } from '@nestjs/common';

import { ProjectEntity } from '../entities/projectEntity';

enum TypeOfDistribution {
  LIKE = 'LIKE',
  PROGRESS = 'PROGRESS',
}
export enum LevelUser {
  NOVICE = 'NOVICE',
  ACTIF = 'ACTIF',
  EXPERT = 'EXPERT',
  GARDIEN = 'GARDIEN',
}

@Injectable()
export class DomainService {
  limitByLevel(user: any) {
    let limitChapter: number = 0;
    let projetcSimultaner = 0;
    let shouldModerate = false;
    let collaboratorByProject = 0;
    if (user.getLevel() == LevelUser.NOVICE) {
      limitChapter = 5;
      projetcSimultaner = 3;
      collaboratorByProject = 2;
      shouldModerate = true;
    } else if (user.getLevel() == LevelUser.ACTIF) {
      limitChapter = 10;
      projetcSimultaner = 5;
      collaboratorByProject = 10;
    } else if (user.getLevel() == LevelUser.EXPERT) {
      limitChapter = 20;
      projetcSimultaner = 10;
      collaboratorByProject = 25;
    } else if (user.getLevel() == LevelUser.GARDIEN) {
      limitChapter = 25;
      projetcSimultaner = 20;
      collaboratorByProject = 50;
    }
    return {
      limitChapter,
      projetcSimultaner,
      shouldModerate,
      collaboratorByProject,
    };
  }

  canPublierProject(projet: ProjectEntity): boolean {
    if (projet.getChapterCount() > 1) return true;
    return false;
  }

  distributePoints(
    project: ProjectEntity,
    user: any,
    type: TypeOfDistribution,
  ) {
    if (
      project.getStatistique().likeCount % 1000 &&
      type == TypeOfDistribution.LIKE
    )
      user.setreputation_score(5);
    if (
      project.completionRate == project.getChapterCount() / 2 &&
      type == TypeOfDistribution.PROGRESS
    )
      user.setreputation_score(30);
  }
}
