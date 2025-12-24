import { Inject, Injectable } from '@nestjs/common';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';

@Injectable()
export class getAllProjectByUniverUseCase {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
  ) {}
  async execute(filter: any, univerId: string): Promise<any> {
    return this.repository.getAllProject(filter, univerId);
  }
}
