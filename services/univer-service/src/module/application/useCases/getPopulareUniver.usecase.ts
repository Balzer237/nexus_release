import { Inject, Injectable } from '@nestjs/common';
import { RepositoryInterface } from 'src/module/domaine/repository/repositoryInterface';

@Injectable()
export class GetPopulareUniversUsecase {
  constructor(
    @Inject('MongooseRepository')
    private readonly service: RepositoryInterface,
  ) {}

  async execute(data: any) {
    return this.service.createUniver(data);
  }
}
