import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Queue } from './entities/queue.entity';
import { QueueService } from './services/queue.service';

@Module({
  imports: [TypeOrmModule.forFeature([Queue])],
  providers: [QueueService],
  exports: [TypeOrmModule, QueueService],
})
export class QueueModule {}
