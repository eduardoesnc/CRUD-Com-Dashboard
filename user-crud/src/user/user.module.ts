import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';  // Importe o PrismaModule

@Module({
  imports: [PrismaModule],  // Adicione PrismaModule aos imports
  providers: [UserService],
  controllers: [UsersController],
})
export class UserModule {}
