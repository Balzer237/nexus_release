import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CreateUniversDto } from 'src/module/adapter/dto/entrant/createUniver.dto';
import { DomaineService } from 'src/module/domaine/domaineService';
import { RepositoryInterface } from 'src/module/domaine/repository/repositoryInterface';

@Injectable()
export class CreateUniverUseCase {
  constructor(
    @Inject('MongooseRepository')
    private readonly repository: RepositoryInterface,
    private readonly domaineService: DomaineService,
     @InjectConnection() private readonly connection: Connection,
  ) {}

  async execute(data: CreateUniversDto) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const dataEnrichie = {
        userLevel:data.userLevel,
        createdBy: data.createdBy,
        description: data.description,
        name: data.name,
        state: {
          numberOfMember: 1,
        },
        rules: {
          codeOfConduct: data.codeOfConduct,
          expertiseLevelREquired: data.expertiseLevelREquired,
        },
      };

      const CanCreateUniver = this.domaineService.CanCreateUniver(dataEnrichie.userLevel);
      if (!CanCreateUniver)
        throw new UnauthorizedException(
          'Vous devez atteindre le niveau GARDIEN pour pouvoir créer un univers',
        );

      const univer = await this.repository.createUniver(dataEnrichie);

      await session.commitTransaction();
      return univer;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
