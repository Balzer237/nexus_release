import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModuleModule } from './module/user/user-module.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const uri = process.env.MONGOURL ?? 'mongodb://127.0.0.1:27017/user-service';
        return {
          uri,
          retryAttempts: 3,
          retryDelay: 3000,
        };
      },
    }),
    UserModuleModule,
   ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
