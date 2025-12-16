import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { jwtMiddleway } from './jwtmiddleway';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { AuthProxyController } from './proxy/auth.proxy';
import { ProjectsProxyController } from './proxy/projet.proxy';
import { UniversesProxyController } from './proxy/univer.proxy';
import { UsersProxyController } from './proxy/user.proxy';

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
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(jwtMiddleway)
    .exclude(
      { path: 'auth/login', method: RequestMethod.POST },
      { path: 'auth/register', method: RequestMethod.POST },
      { path: 'auth/refresh', method: RequestMethod.POST },
      
    )
    .forRoutes({ path: '*', method: RequestMethod.ALL });
}
}
