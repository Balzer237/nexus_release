import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryInterface } from 'src/module/domaine/repository/repositoryInterface';

@Injectable()
export class GetParticipantByIdUsecase {
  constructor(
    @Inject('MongooseRepository')
    private readonly service: RepositoryInterface,
  ) {}

  async execute(id: string) {
    const response = await this.service.getParticipantById(id);
    if (!response) throw new NotFoundException('participant not found');
    return response;
  }
}
