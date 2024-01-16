import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/mysql/client'

@Injectable()
export class PrismaMysqlService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}