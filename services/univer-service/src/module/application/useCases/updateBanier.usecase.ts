import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MediaType } from 'src/lib/type';
import { UniverEntity } from 'src/module/domaine/entities/universEntiy';
import { RepositoryInterface } from 'src/module/domaine/repository/repositoryInterface';
import { UniverMapper } from 'src/module/infrastructure/mapper/univerMapper';

@Injectable()
export class UpdateBanierUseCase {
  constructor(
    @Inject('MongooseRepository')
    private readonly repository: RepositoryInterface,
  ) {}

  async execute(id: string, data: MediaType) {
    const univers: UniverEntity = await this.repository.getUniverById(id);
    if (!univers) throw new NotFoundException('Univers not found');
    univers.setBanier(data);
    return await this.repository.saveUniver(UniverMapper.UniversToUniversDocument(univers));
  }
}
