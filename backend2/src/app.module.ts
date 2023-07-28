import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    ClientsModule.register([
      {
        name: process.env.RESPONSE_QUEUE_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URI],
          queue: process.env.RESPONSE_QUEUE_NAME,
          queueOptions: {
            durable: false
          },
        }
      },
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
