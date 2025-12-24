import { Inject, Injectable } from '@nestjs/common';
import { LikeEntity } from '../../domaine/entities/like.entity';
import { ProjectEntity } from '../../domaine/entities/projectEntity';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';

@Injectable()
export class getAllProjectByUnivers {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
  ) {}
  async execute(univerId: string, userId: string, filter?: any): Promise<any> {
    const allProject: ProjectEntity[] = await this.repository.getAllProject(
      filter,
      univerId,
    );

    const projetcId = allProject.map((c) => c.getId());
    //on parcours les comments et si l'user a liker, on  recupere son objet likeEntity
    const liked: LikeEntity[] = await this.repository.allLikedRessource({
      ressourceId: projetcId,
      userId: userId,
      type: 'projectId',
    });

    const likedProjectId = liked.map((c) => c.projectId);

    const enrichiProject = allProject.map((c) => ({
      ...c,
      isLiked: likedProjectId.includes(c.getId().toString()),
    }));

    return enrichiProject;
  }
}
