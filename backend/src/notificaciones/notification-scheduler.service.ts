import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificacionesService } from './notificaciones.service';

@Injectable()
export class NotificationSchedulerService {
  constructor(
    private prisma: PrismaService,
    private notificacionesService: NotificacionesService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async handleTasksTwoDaysOld() {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const tasks = await this.prisma.tarea.findMany({
      where: {
        tarea_fechaCreacion: {
          gte: new Date(twoDaysAgo.setHours(0, 0, 0, 0)),
          lt: new Date(twoDaysAgo.setHours(23, 59, 59, 999)),
        },
      },
    });

    for (const task of tasks) {
      await this.notificacionesService.create({
        notificacion_mensaje: `La tarea "${task.tarea_titulo}" tiene 2 días de creada.`,
        tarea_id: task.tarea_id,
      });
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async handleTasksDueInTwoDays() {
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

    const tasks = await this.prisma.tarea.findMany({
      where: {
        tarea_fechaLimite: {
          gte: new Date(twoDaysFromNow.setHours(0, 0, 0, 0)),
          lt: new Date(twoDaysFromNow.setHours(23, 59, 59, 999)),
        },
      },
    });

    for (const task of tasks) {
      await this.notificacionesService.create({
        notificacion_mensaje: `La tarea "${task.tarea_titulo}" vence en 2 días.`,
        tarea_id: task.tarea_id,
      });
    }
  }
}
