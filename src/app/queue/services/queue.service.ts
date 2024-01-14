import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from '../entities/queue.entity';
import { Repository } from 'typeorm';
import { ServiceBase } from '../../../common/base/service.base';

@Injectable()
export class QueueService extends ServiceBase<Queue> {
  constructor(
    @InjectRepository(Queue) private readonly queueRepo: Repository<Queue>,
  ) {
    super(queueRepo);
  }
}
