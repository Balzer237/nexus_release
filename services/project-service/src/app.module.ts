import { Module } from '@nestjs/common';
import { AppService } from './app.service';
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

  controllers: [],

  providers: [AppService],
})
export class AppModule {}
