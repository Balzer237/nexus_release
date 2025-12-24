import { Inject, Injectable } from '@nestjs/common';
import { FindAllUniversDto } from 'src/module/adapter/dto/entrant/findAllUniver.dto';
import { RepositoryInterface } from 'src/module/domaine/repository/repositoryInterface';

@Injectable()
export class getAllUniversUsecase {
  constructor(
    @Inject('MongooseRepository')
    private readonly service: RepositoryInterface,
  ) {}

  async execute(data: FindAllUniversDto) {
    const allUniver = await this.service.getAllUnivers(data);
    return allUniver;
  }
}
