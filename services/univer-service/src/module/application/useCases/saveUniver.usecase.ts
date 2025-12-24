import { Inject, Injectable } from '@nestjs/common';
import { UniverEntity } from 'src/module/domaine/entities/universEntiy';
import { RepositoryInterface } from 'src/module/domaine/repository/repositoryInterface';
import { UniverMapper } from 'src/module/infrastructure/mapper/univerMapper';

@Injectable()
export class SaveUniverUseCase {
  constructor(
    @Inject('MongooseRepository')
    private readonly repository: RepositoryInterface,
  ) {}

  async execute(data: UniverEntity) {
    return await this.repository.saveUniver(UniverMapper.UniversToUniversDocument(data));
  }
}
