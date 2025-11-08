import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { MailService } from 'src/email/mail.service';
import { v4 as uuidv4 } from 'uuid';
import { Usuario } from 'generated/prisma';

const SALT_ROUNDS = 12;

@Injectable()
export class UsuariosService {
  async findOne(id: number): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { usuario_id: id },
    });
  }
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const existingUser = await this.prisma.usuario.findUnique({ where: { usuario_id: id } });
    if (!existingUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }

    if (updateUsuarioDto.usuario_contrasena) {
      updateUsuarioDto.usuario_contrasena = await bcrypt.hash(
        updateUsuarioDto.usuario_contrasena,
        SALT_ROUNDS,
      );
    }

    return this.prisma.usuario.update({
      where: { usuario_id: id },
      data: updateUsuarioDto,
    });
  }
  async remove(id: number): Promise<Usuario> {
    const existingUser = await this.prisma.usuario.findUnique({ where: { usuario_id: id } });
    if (!existingUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }
    return this.prisma.usuario.delete({
      where: { usuario_id: id },
    });
  }
  async findAll(rol_id?: number): Promise<Usuario[]> {
    const whereClause = rol_id ? { rol_id } : {};
    return this.prisma.usuario.findMany({
      where: whereClause,
      include: { rol: true }, // Incluir la relación con el rol si es necesario
    });
  }
  constructor(private prisma: PrismaService, private mailService: MailService) {}

  // 🔹 Crear usuario
  async create(createUsuarioDto: CreateUsuarioDto) {
    const defaultRole = await this.prisma.rol.findUnique({
      where: { rol_nombre: 'Usuario' },
    });

    if (!defaultRole) {
      throw new BadRequestException('El rol "Usuario" no existe.');
    }

    const hashedPassword = await bcrypt.hash(
      createUsuarioDto.usuario_contrasena,
      SALT_ROUNDS,
    );

    const verificationToken = uuidv4();
    const verificationTokenExpires = new Date();
    verificationTokenExpires.setHours(verificationTokenExpires.getHours() + 24);

    const nuevoUsuario = await this.prisma.usuario.create({
      data: {
        usuario_nombre: createUsuarioDto.usuario_nombre,
        usuario_apellido: createUsuarioDto.usuario_apellido,
        usuario_correo: createUsuarioDto.usuario_correo,
        usuario_contrasena: hashedPassword,
        rol_id: defaultRole.rol_id,
        verificado: false, // usar booleano para MySQL
        verificationToken,
        verificationTokenExpires,
      },
    });

    await this.mailService.sendUserVerificationEmail(
      nuevoUsuario.usuario_correo,
      verificationToken,
      nuevoUsuario.usuario_nombre,
    );

    return nuevoUsuario;
  }

  // 🔹 Verificar usuario desde token
  async verifyEmail(token: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { verificationToken: token },
    });

    if (!usuario) {
      throw new NotFoundException('Token inválido o expirado.');
    }

    if (usuario.verificado === true) {
      return { message: 'El usuario ya está verificado.' };
    }

    if (
      usuario.verificationTokenExpires &&
      usuario.verificationTokenExpires < new Date()
    ) {
      throw new BadRequestException('El token de verificación ha expirado.');
    }

    const updated = await this.prisma.usuario.update({
      where: { usuario_id: usuario.usuario_id },
      data: {
        verificado: true, // 🔹 cambia de false a true
        verificationToken: null,
        verificationTokenExpires: null,
      },
    });

    console.log('✅ Usuario verificado:', updated.usuario_id);
    return { message: 'Correo electrónico verificado exitosamente.' };
  }

  // 🔹 Actualizar estado de verificación manualmente
  async updateVerificationStatus(usuario_id: number, status: boolean): Promise<Usuario> {
    console.log('UsuarioService: updateVerificationStatus - Intentando actualizar verificado para usuario_id:', usuario_id, 'a estado:', status);
    try {
      const updatedUser = await this.prisma.usuario.update({
        where: { usuario_id: usuario_id },
        data: { verificado: status },
      });
      console.log('UsuarioService: updateVerificationStatus - Usuario actualizado:', updatedUser.usuario_id, 'verificado:', updatedUser.verificado);
      return updatedUser;
    } catch (error: any) {
      console.error('UsuarioService: updateVerificationStatus - Error al actualizar verificado para usuario_id:', usuario_id, 'Error:', error);
      throw error; // Re-lanzar el error para que sea manejado por el llamador
    }
  }
}
