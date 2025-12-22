import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModuleModule } from './module/user/user-module.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const uri = process.env.MONGOURL
        if (!uri) {
          throw new Error('MONGOURL is not defined in env');
        }
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
