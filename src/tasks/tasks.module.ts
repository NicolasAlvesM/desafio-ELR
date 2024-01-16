import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [PrismaModule, LogsModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
