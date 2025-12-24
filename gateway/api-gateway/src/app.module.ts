import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { jwtMiddleway } from './jwtmiddleway';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { AuthProxyController } from './proxy/authProxy/auth.proxy';
import { ProjectsProxyController } from './proxy/projectProxy/projet.proxy';
import { UniversesProxyController } from './proxy/univerProxy/univer.proxy';
import { UsersProxyController } from './proxy/userProxy/user.proxy';
import { VerifyToken } from 'src/lib/verifyToken';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
    JwtModule.register({
      secret: process.env.JWT_PUBLIC_KEY,
    })
  ],
  controllers: [
    AppController,
    AuthProxyController,
    UsersProxyController,
    UniversesProxyController,
    ProjectsProxyController,
    
    
  ],
  providers: [
    VerifyToken,
    AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(jwtMiddleway)
    .exclude(
      { path: 'auth/login', method: RequestMethod.POST },
      { path: 'auth/register', method: RequestMethod.POST },
      { path: 'auth/refresh', method: RequestMethod.POST },
      {path: 'users', method:RequestMethod.POST},
      {path: 'users/:id', method:RequestMethod.GET}
      
    )
    .forRoutes({ path: '*', method: RequestMethod.ALL });
}
}
