import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SetVisibilityDTO } from 'src/module/adapter/dto/entrant/setVisibility.dto';
import { UniverEntity, UniverVisibility } from 'src/module/domaine/entities/universEntiy';
import { RepositoryInterface } from 'src/module/domaine/repository/repositoryInterface';
import { UniverMapper } from 'src/module/infrastructure/mapper/univerMapper';

@Injectable()
export class setVisibilityUseCase {
  constructor(
    @Inject('MongooseRepository')
    private readonly repository: RepositoryInterface,
  ) {}

  async execute(data: SetVisibilityDTO) {
    let visibility: UniverVisibility;
    switch (data.visibility) {
      case 0:
        visibility = UniverVisibility.PRIVATE;
        break;
      case 1:
        visibility = UniverVisibility.PUBLIC;
        break;
      default:
        throw new BadRequestException(
          'Only value (0-private and 1->public) are allowed',
        );
    }
    const univers: UniverEntity = await this.repository.getUniverById(
      data.idUniver,
    );
    if (!univers) throw new NotFoundException('Univers not found');
    univers.setVisibility(visibility);
    return await this.repository.saveUniver(UniverMapper.UniversToUniversDocument(univers));
  }
}
