import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryInterface } from 'src/module/domaine/repository/repositoryInterface';

@Injectable()
export class getOnParticipantOfUniverUsecase {
  constructor(
    @Inject('MongooseRepository')
    private readonly repository: RepositoryInterface,
  ) {}

  async execute(userId: string, univerId: string) {
    const reponse = await this.repository.findParticipantByUserAndUniver(
      userId,
      univerId,
    );
    if (!reponse)
      throw new NotFoundException('user not follow this univers:not found');
    return reponse;
  }
}
