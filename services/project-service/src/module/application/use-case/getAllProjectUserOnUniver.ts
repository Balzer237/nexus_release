import { Inject, Injectable } from '@nestjs/common';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';

@Injectable()
export class GetAllProjectUserOnUniverUseCase {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
  ) {}
  async execute(univerId: string, userId: string, filter?: any): Promise<any> {
    return this.repository.getAllProjectUserOnUniver(userId, univerId);
  }
}
