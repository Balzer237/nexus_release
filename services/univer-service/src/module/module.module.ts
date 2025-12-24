import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetUniversByIdToUserUsecase, GetUniversByIdUsecase } from './application/useCases/getUniversByid.usecase';
import { SaveParticipantUseCase } from './application/useCases/saveParticipant.usecase';
import { getOnParticipantOfUniverUsecase } from './application/useCases/getParticipantOfUnivers.usecase';
import { DomaineService } from './domaine/domaineService';
import { GetParticipantByIdUsecase } from './application/useCases/getParticipantById.usecase';
import { getAllUniversUsecase } from './application/useCases/getAllUniver.usecase';
import { setVisibilityUseCase } from './application/useCases/setVisibilityUniver.usecase';
import { BanirPartivipantUsecase } from './application/useCases/banierParticipant.usecase';
import { UpdateRuleUsecase } from './application/useCases/updateRule.usecase';
import { UpdateLogoUseCase } from './application/useCases/updateLogo.usecase';
import { UpdateBanierUseCase } from './application/useCases/updateBanier.usecase';
import { UniversUpdateUsecase } from './application/useCases/updateuniver.usecase';
import { JointUniversUsecase } from './application/useCases/jointUniver.usecase';
import { GetPopulareUniversUsecase } from './application/useCases/getPopulareUniver.usecase';
import { getAllUserUniversUsecase } from './application/useCases/getAllUserUniverJoined.usecase';
import { deleteUniverUseCase } from './application/useCases/deleteUniver.usecase';
import { CreateUniverUseCase } from './application/useCases/createUniver.usecase';
import { SaveUniverUseCase } from './application/useCases/saveUniver.usecase';
import { RepositoryMongooseImplementation } from './infrastructure/mongoose/repositoryMongooseImplementation';
import { UniversSchema } from './infrastructure/mongoose/schema/universSchema';
import { ParticipantSchema } from './infrastructure/mongoose/schema/participantSchema';
import { UniverController } from './adapter/rest/rest.controller';

@Module({
    imports:[
        MongooseModule.forFeature([
      { name: 'Univers', schema: UniversSchema },
      { name: 'Participant', schema: ParticipantSchema },
    ]),
    ],
    controllers:[UniverController],
    providers:[
        GetUniversByIdToUserUsecase,
    SaveParticipantUseCase,
    getOnParticipantOfUniverUsecase,
    DomaineService,
    GetParticipantByIdUsecase,
    getAllUniversUsecase,
    setVisibilityUseCase,
    BanirPartivipantUsecase,
    UpdateRuleUsecase,
    UpdateLogoUseCase,
    UpdateBanierUseCase,
    UniversUpdateUsecase,
    GetUniversByIdUsecase,
    JointUniversUsecase,
    GetPopulareUniversUsecase,
    getAllUserUniversUsecase,
    deleteUniverUseCase,
    CreateUniverUseCase,
    SaveUniverUseCase,

    {
      provide: 'MongooseRepository',
      useClass: RepositoryMongooseImplementation,
    },
    ]
})
export class UniverModule {}
