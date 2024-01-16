import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogsService } from '../logs/logs.service'


const metodos = {
    PATCH: "Alterar tarefa",
    DELETE: "Deletar tarefa"
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logService: LogsService) {}
  async use(req: Request, res: Response, next: NextFunction) {

      //modificar
      console.log("Chamou midd")
      const { user_id } = req.body
      const data = {data:{action: metodos[req.method], user: user_id,taskId: Number(req.params.id)}} 
      
      res.on('finish', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          this.logService.createLog(data);
        }
      });

    next();
  }
}
