import { Module } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionesController } from './notificaciones.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/login/jwt-auth.guard'; // 👈 importa el guard
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationSchedulerService } from './notification-scheduler.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'cambia_este_secreto', // 👈 MISMO secreto que usas al firmar
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [NotificacionesController],
  providers: [NotificacionesService, PrismaService, JwtAuthGuard, NotificationSchedulerService], // 👈 registra el guard
})
export class NotificacionesModule {}