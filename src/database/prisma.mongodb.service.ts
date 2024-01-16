import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/mongodb/client'

@Injectable()
export class PrismaMongodbService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}