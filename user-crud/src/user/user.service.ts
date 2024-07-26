import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  // async getUsersCountForCurrentMonth(): Promise<number> {
  //   const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  //   const endOfMonth = new Date(startOfMonth);
  //   endOfMonth.setMonth(endOfMonth.getMonth() + 1);

  //   return await this.prisma.user.count({
  //     where: {
  //       createdAt: {
  //         gte: startOfMonth,
  //         lt: endOfMonth,
  //       },
  //     },
  //   });
  // }
}
