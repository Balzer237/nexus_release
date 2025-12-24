import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './infrastructure/mongoose/schema/user-schema';
import { RelationshipSchema } from './infrastructure/mongoose/schema/relationship-schema';
import { UsersController } from './adapter/rest/restController';
import { FindAllUsersUseCase } from './application/use-cases/findAllUser.use-case';
import { UpdateUserUseCase } from './application/use-cases/updateUser.usecase';
import { AddPointsUseCase } from './application/use-cases/addPoints.use-case';
import { AddSkillsUseCase } from './application/use-cases/addSkills.use-case';
import { CreateUserUseCase } from './application/use-cases/createUser.use-case';
import { FindByEmailUseCase } from './application/use-cases/findByEmail.use-case';
import { FindUserByIdUseCase } from './application/use-cases/findUserById.use-case';
import { GetUserStatsUseCase } from './application/use-cases/getUseStats.use-case';
import { RemovePointsUseCase } from './application/use-cases/removePoints.use-case';
import { RemoveSkillsUseCase } from './application/use-cases/removeSkillls.use-case';
import { SuspendUserUseCase } from './application/use-cases/suspendUser.use-case';
import { UnSuspendUserUseCase } from './application/use-cases/unSuspendUser.use-case';
import { UpdateAvatarUseCase } from './application/use-cases/updateAvatard.use-case';
import { UpdatePasswordUseCase } from './application/use-cases/updatePassword.use-case';
import { UpdateProfileUseCase } from './application/use-cases/updateProfile.use-case';
import { followAnotherUser } from './application/use-cases/followUser.use-case';
import { GetFollowerUserUseCase } from './application/use-cases/getFollowerUser.use-case';
import { GetFollowingUserUseCase } from './application/use-cases/getFollowingUser.use-case';
import { unFollowUser } from './application/use-cases/unFollowUser.user-case';
import { userMongooseRepositoryImplementation } from './infrastructure/mongoose/repository-implementation';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: userSchema },
      { name: 'Relationship', schema: RelationshipSchema },
    ]),
   ],
  controllers: [UsersController],
  providers: [
     {
    provide: 'NATS_PROVIDER',
    useFactory: () => {
      return ClientProxyFactory.create({
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_URL || 'nats://localhost:4222'],
        },
      });
    }
    },
    {
      provide: 'USER_REPOSITORY',
      useClass: userMongooseRepositoryImplementation,
    },
    FindAllUsersUseCase,
    UpdateUserUseCase,
    AddPointsUseCase,
    AddSkillsUseCase,
    CreateUserUseCase,
    FindByEmailUseCase,
    FindUserByIdUseCase,
    followAnotherUser,
    GetFollowerUserUseCase,
    GetFollowingUserUseCase,
    GetUserStatsUseCase,
    RemovePointsUseCase,
    RemoveSkillsUseCase,
    SuspendUserUseCase,
    unFollowUser,
    UnSuspendUserUseCase,
    UpdateAvatarUseCase,
    UpdatePasswordUseCase,
    UpdateProfileUseCase,
  ],
})
export class UserModuleModule {}
