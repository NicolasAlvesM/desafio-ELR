import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaMysqlService } from 'src/database/prisma.mysql.service';
import { user as UserModel } from  '@prisma/mysql/client'
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaMysqlService) {}
  //modificar prisma.create
  async create(data: CreateUserDto): Promise<UserModel> {
    const user = await this.prisma.user.findFirst({
      where:{
        email: data.email
      }
    })

    if(user)
      throw new ConflictException('User already exist');

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(data.password, salt);
    return this.prisma.user.create({
      data:{
        ...data,
        password: hash
      }
    });
    
  }

  findOne(email: string) {
    return this.prisma.user.findFirstOrThrow({
      where:{
        email
      }
    })
  }

}
