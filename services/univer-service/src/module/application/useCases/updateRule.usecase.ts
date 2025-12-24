import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateRuleUNiverDto } from 'src/module/adapter/dto/entrant/updateRuleOfUniver.dto';
import { UniverEntity } from 'src/module/domaine/entities/universEntiy';
import { RepositoryInterface } from 'src/module/domaine/repository/repositoryInterface';
import { UniverMapper } from 'src/module/infrastructure/mapper/univerMapper';

@Injectable()
export class UpdateRuleUsecase {
  constructor(
    @Inject('MongooseRepository')
    private readonly repository: RepositoryInterface,
  ) {}

  async execute(data: UpdateRuleUNiverDto) {
    const univers: UniverEntity = await this.repository.getUniverById(
      data.univerId,
    );
    if (!univers) throw new NotFoundException('Univers not found');
    
    //Ajouter plutard une virifivation de son role dans l'univer (pour l'instant seul le createur peut modifier)
    if (univers.getCreatedBy().toString() != data.userId.toString())
      throw new UnauthorizedException('Not allowed');

    univers.setCodeOfConduct(data.rule);
    console.log('univer', univers);
    return await this.repository.saveUniver(UniverMapper.UniversToUniversDocument(univers));
  }
}
