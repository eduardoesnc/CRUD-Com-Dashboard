import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel, Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async createUser(@Body() userData: Prisma.UserCreateInput): Promise<UserModel> {
    return this.usersService.createUser(userData);
  }

  @Get()
  async getUsers(): Promise<UserModel[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserModel | null> {
    return this.usersService.getUserById(Number(id));
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userData: Prisma.UserUpdateInput): Promise<UserModel> {
    return this.usersService.updateUser(Number(id), userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.deleteUser(Number(id));
  }

}