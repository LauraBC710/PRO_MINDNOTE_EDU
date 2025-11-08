import { Module, forwardRef } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    forwardRef(() => UsuariosModule), // ✅ usa forwardRef para evitar ciclo
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
