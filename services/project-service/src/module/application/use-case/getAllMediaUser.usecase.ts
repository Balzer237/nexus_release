import { Inject, Injectable } from '@nestjs/common';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';

@Injectable()
export class GetAllMediaByUser {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
    ) {}
  async execute(participantId: string): Promise<any> {
     return this.repository.getAllMediaByUser(participantId);
  }
}
