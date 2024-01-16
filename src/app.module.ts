import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { PrismaModule } from './database/prisma.module';
import { LogsModule } from './logs/logs.module';
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports: [TasksModule, PrismaModule, LogsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
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
