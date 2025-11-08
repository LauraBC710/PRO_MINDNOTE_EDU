import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const MAX_FAILED_ATTEMPTS = 3;
const LOCKOUT_TIME_MINUTES = 15;

@Injectable()
export class LoginService {
  verifyEmail(token: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // 🔹 Inicio de sesión seguro con bloqueo
  async login(body: any) {
    const { usuario_correo, usuario_contrasena } = body;

    // 1️⃣ Buscar usuario por correo
    const user = await this.prisma.usuario.findUnique({
      where: { usuario_correo },
    });

    if (!user) {
      throw new UnauthorizedException('Correo electrónico o contraseña incorrectos.');
    }

    // 2️⃣ Verificar si la cuenta está bloqueada
    if (user.lockoutUntil && user.lockoutUntil > new Date()) {
      const remainingTime = Math.ceil(
        (user.lockoutUntil.getTime() - new Date().getTime()) / (1000 * 60),
      );
      throw new ForbiddenException(
        `Cuenta bloqueada. Inténtalo nuevamente en ${remainingTime} minutos.`,
      );
    }

    // 3️⃣ Comparar contraseña con bcrypt
    const isMatch = await bcrypt.compare(usuario_contrasena, user.usuario_contrasena);
    if (!isMatch) {
      const failedAttempts = user.failedLoginAttempts + 1;

      // Bloquear si excede los intentos
      const lockoutUntil =
        failedAttempts >= MAX_FAILED_ATTEMPTS
          ? new Date(Date.now() + LOCKOUT_TIME_MINUTES * 60 * 1000)
          : null;

      await this.prisma.usuario.update({
        where: { usuario_id: user.usuario_id },
        data: {
          failedLoginAttempts: failedAttempts,
          lockoutUntil,
        },
      });

      if (lockoutUntil) {
        throw new ForbiddenException(
          `Demasiados intentos fallidos. Cuenta bloqueada por ${LOCKOUT_TIME_MINUTES} minutos.`,
        );
      }

      throw new UnauthorizedException('Correo electrónico o contraseña incorrectos.');
    }

    // 4️⃣ Verificar si el usuario está verificado
    if (!user.verificado) {
      throw new UnauthorizedException('Tu cuenta no ha sido verificada. Por favor, revisa tu correo electrónico para verificarla.');
    }

    // 5️⃣ Si la contraseña es correcta, reiniciar contadores de fallos
    if (user.failedLoginAttempts > 0 || user.lockoutUntil) {
      await this.prisma.usuario.update({
        where: { usuario_id: user.usuario_id },
        data: {
          failedLoginAttempts: 0,
          lockoutUntil: null,
        },
      });
    }

    // 6️⃣ Crear token JWT
    const token = await this.jwtService.signAsync(
      {
        sub: user.usuario_id,
        correo: user.usuario_correo,
        rol: user.rol_id, // o user.usuario_rol según tu esquema
      },
      { expiresIn: '2h' },
    );

    // 7️⃣ Respuesta final
    return {
      success: true,
      mensaje: 'Inicio de sesión exitoso',
      token,
      data: {
        usuario_id: user.usuario_id,
        usuario_nombre: user.usuario_nombre,
        usuario_apellido: user.usuario_apellido,
        usuario_correo: user.usuario_correo,
        rol_id: user.rol_id, // o usuario_rol si usas string
      },
    };
  }

  // 🔹 Obtener usuario por ID (para /login/perfil)
  async getUsuarioById(id: number) {
    return await this.prisma.usuario.findUnique({
      where: { usuario_id: id },
      select: {
        usuario_id: true,
        usuario_nombre: true,
        usuario_apellido: true,
        usuario_correo: true,
        rol_id: true,
      },
    });
  }

  // Métodos placeholder (opcionalmente se pueden eliminar)
  findAll() {
    return 'This action returns all login';
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: any) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }


}
