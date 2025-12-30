import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { SecurityModule } from './modules/security/security.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, PrismaModule, SecurityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
