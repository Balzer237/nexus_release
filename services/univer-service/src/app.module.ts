import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UniverModule } from './module/module.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const uri = process.env.MONGOURL ?? 'mongodb://127.0.0.1:27017/univer-service';
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
