import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const microserviceApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URI],
      queue: process.env.RESPONSE_QUEUE_NAME,
      queueOptions: {
        durable: false
      },
    }
  })

  const app = await NestFactory.create(AppModule);

  await microserviceApp.listen()
  await app.listen(3000);
}
bootstrap();
