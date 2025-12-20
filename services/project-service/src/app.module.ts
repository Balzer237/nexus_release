import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProjectController } from './adapter/res/projectController';

@Module({
  imports: [],
  controllers: [
    ProjectController
  ],
  providers: [AppService],
})
export class AppModule {}
