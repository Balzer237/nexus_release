import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: [process.env.NATSURL || process.env.NATS_URL || 'nats://localhost:4222'],
    },
  });

  await app.listen();
}
bootstrap();
