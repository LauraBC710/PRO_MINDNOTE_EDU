import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class MailService {
  private resend: Resend;
  private senderEmail: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => UsuariosService))
    private readonly usuariosService: UsuariosService, // ✅ inyectado correctamente
  ) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    this.senderEmail =
      this.configService.get<string>('SENDER_EMAIL') ||
      'support@mindnoteedu.site';
    this.resend = new Resend(apiKey);
  }

  async sendUserVerificationEmail(to: string, token: string, usuario_nombre: string) {
    const backendUrl =
      this.configService.get<string>('BACKEND_URL') ||
      'http://localhost:5173';
    const verificationLink = `${backendUrl}/usuarios/verify?token=${token}`;

    try {
      await this.resend.emails.send({
        from: this.senderEmail,
        to,
        subject: '👋 Bienvenido a MindNoteEdu – Verifica tu cuenta para comenzar',
        html: `
          <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif">
            <h2>Hola ${usuario_nombre} 👋</h2>
            <p>Gracias por unirte a <strong>MindNoteEdu</strong>. Solo falta un paso:</p>
            <p>
              <a href="${verificationLink}" style="background:#4b72ff;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;">Verificar mi cuenta</a>
            </p>
            <p>Si no creaste esta cuenta, ignora este correo.</p>
          </div>
        `,
      });
      console.log(`✅ Email de verificación enviado a ${to}`);
    } catch (error) {
      console.error(`❌ Error enviando correo a ${to}:`, error);
    }
  }

  async verifyUserAccount(usuario_id: number) {
    try {
      console.log('MailService: verificando usuario con ID:', usuario_id);
      const updatedUser = await this.usuariosService.updateVerificationStatus(
        usuario_id,
        true,
      );
      return {
        success: true,
        message: 'Usuario verificado correctamente.',
        user: updatedUser,
      };
    } catch (error) {
      console.error('MailService: error al verificar usuario:', error);
      return {
        success: false,
        message: 'Error al verificar usuario.',
      };
    }
  }
}
