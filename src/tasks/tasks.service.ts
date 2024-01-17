import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaMysqlService } from '../database/prisma.mysql.service'
import { task as TaskModel } from '@prisma/client'
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaMysqlService, private logService: LogsService) {}
  //modificar prisma.create
  async create(data: CreateTaskDto): Promise<TaskModel> {
    const task = await this.prisma.task.create({
      data
    });

    await this.logService.createLog({
      data:{
        action: "Criar tarefa",
        user: data.user_id,
        taskId: task.id
      }
    })

    return task
  }

  findAll(): Promise<TaskModel[]> {
    return this.prisma.task.findMany()
  }

  findOne(id: number): Promise<TaskModel> {
    return this.prisma.task.findFirstOrThrow({
      where:{
        id
      }
    })
  }

  update(id: number, data: UpdateTaskDto): Promise<TaskModel> {
    return this.prisma.task.update({
      where:{
        id
      },
      data
    });
  }

  remove(id: number): Promise<TaskModel> {
    return this.prisma.task.delete({
      where:{
        id
      },
    });
  }
}
