import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';  // Importe o PrismaModule

@Module({
  imports: [UserModule, PrismaModule],  // Adicione UserModule e PrismaModule aos imports
})
export class AppModule {}
