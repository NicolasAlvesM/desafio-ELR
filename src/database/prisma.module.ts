import { Module } from '@nestjs/common';
import { PrismaMysqlService } from './prisma.mysql.service';
import { PrismaMongodbService } from './prisma.mongodb.service';

@Module({
  providers: [PrismaMysqlService,PrismaMongodbService],
  exports: [PrismaMysqlService, PrismaMongodbService],
})
export class PrismaModule {}