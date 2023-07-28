import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('response_queue') private readonly client: ClientProxy
  ) {
    this.count = 0
  }

  private count: number

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('task')
  async task(data: any) {
    this.count += Number(data.id)
    this.client.emit('response', this.count)
  }
}
