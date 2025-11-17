import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ProducerService } from '../queue/producer.service';

@Module({
  controllers: [ApiController],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ApiModule {}
