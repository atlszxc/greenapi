import { Controller, Get, Inject, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('task_queue') private readonly client: ClientProxy
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('response')
  async response(count: number) {
    console.log(count)
  }

  @Get('/task/:id')
  async task(@Param('id') id: string) {
    this.client.emit('task', {
      id
    })
  }
}
