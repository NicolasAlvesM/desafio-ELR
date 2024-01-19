import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogsService } from '../logs/logs.service'


const metodos = {
    PATCH: "Alterar tarefa",
    DELETE: "Deletar tarefa"
}

interface ReqUser extends Request{
  user: {
    sub: number
  }
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logService: LogsService) {}
  async use(req: ReqUser, res: Response, next: NextFunction) {

      //modificar
      const data = {data:{action: metodos[req.method], user: req.user.sub,taskId: Number(req.params.id)}} 
      
      res.on('finish', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          this.logService.createLog(data);
        }
      });

    next();
  }
}
