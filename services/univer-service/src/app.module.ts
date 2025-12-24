import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UniverModule } from './module/module.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const uri = process.env.MONGOURL||'3000'
        if (!uri) {
          throw new Error('MONGOURL is not defined in env for univer service');
        }
        return {
          uri,
          retryAttempts: 3,
          retryDelay: 3000,
        };
      },
    }),
    UniverModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
