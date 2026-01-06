import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel as User } from '@/modules/prisma/generated/models';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async createUser(user: CreateUserDto) {
    try {
      const result = await this.prisma.user.create({
        data: user,
      });
      return result;
    } catch (error) {
      console.error('Full error creating user:', error);
      throw error;
    }
  }
}
