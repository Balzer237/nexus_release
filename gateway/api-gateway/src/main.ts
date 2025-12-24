import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API Nexus_release')
    .setDescription('My Nexus_release api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
    }),
);

  app.connectMicroservice({
    transport: Transport.NATS,
    options: {
      servers: [process.env.NATS_URL],
    },
  });

 
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
   await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
