import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProjectsController } from './module/adapter/res/projectController';
import { ProjectModule } from './module/prjectModule';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const uri = process.env.MONGOURL ?? 'mongodb://127.0.0.1:27017/project-service';
        return {
          uri,
          retryAttempts: 3,
          retryDelay: 3000,
        };
      },
    }),
    ProjectModule],

  controllers: [
    ProjectsController
  ],

  providers: [AppService],
})
export class AppModule {}
