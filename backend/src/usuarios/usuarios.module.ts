import { Module, forwardRef } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/email/mail.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => MailModule), // 🔁 rompe la dependencia circular
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService], // ✅ NECESARIO para que MailModule lo use
})
export class UsuariosModule {}
