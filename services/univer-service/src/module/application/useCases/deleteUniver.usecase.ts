import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DomaineService } from 'src/module/domaine/domaineService';
import { UniverEntity, univerStatus } from 'src/module/domaine/entities/universEntiy';
import { RepositoryInterface } from 'src/module/domaine/repository/repositoryInterface';
import { UniverMapper } from 'src/module/infrastructure/mapper/univerMapper';

@Injectable()
export class deleteUniverUseCase {
  constructor(
    @Inject('MongooseRepository')
    private readonly repository: RepositoryInterface,
    private readonly domaineService: DomaineService,
  ) {}

  async execute(univerId: string, userId: string) {
    const univer: UniverEntity = await this.repository.getUniverById(univerId);
    if (!univer)
      throw new NotFoundException('Univer not found or allready deleted');
    const canDelete = this.domaineService.CanDeleteUniver(userId, univer);
    if (!canDelete)
      throw new UnauthorizedException("You can't delete this univers");

    univer.setStatus(univerStatus.DELETE);

    await this.repository.saveUniver(UniverMapper.UniversToUniversDocument(univer));
    return { success: true };
  }
}
