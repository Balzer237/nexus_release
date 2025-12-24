import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindAllUserUniversDto } from 'src/module/adapter/dto/entrant/findAllUserUniver.dto';
import { RepositoryInterface } from 'src/module/domaine/repository/repositoryInterface';

@Injectable()
export class getAllUserUniversUsecase {
  constructor(
    @Inject('MongooseRepository')
    private readonly service: RepositoryInterface,
     ) {}

  async execute(data: FindAllUserUniversDto) {
    return await this.service.getAllUniverUserJoined(data);
  }
}
