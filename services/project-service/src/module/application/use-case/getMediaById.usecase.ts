import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepositoryInterface } from 'src/module/domaine/repositoryInterface';

@Injectable()
export class getMediaById {
  constructor(
    @Inject('mongooseRepository')
    private readonly repository: ProjectRepositoryInterface,
  ) {}
  async execute(mediaId: string): Promise<any> {
    const response = await this.repository.getMediaById(mediaId);
    if (!response) throw new NotFoundException('Media not found or deleted');
    return response;
  }
}
