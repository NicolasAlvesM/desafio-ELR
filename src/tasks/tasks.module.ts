import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { LogsModule } from 'src/logs/logs.module';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';

@Module({
  imports: [PrismaModule, LogsModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        {path:'tasks', method: RequestMethod.GET}, 
        {path:'tasks/:id', method: RequestMethod.GET},
        {path:'tasks/:id', method: RequestMethod.POST}, 
        {path:'tasks', method: RequestMethod.POST} 
      )
      .forRoutes(TasksController);
  }
}
