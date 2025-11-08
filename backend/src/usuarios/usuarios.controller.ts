import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  NotFoundException,
  Res, // Añadir Res
  Response, // Añadir Response
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ConfigService } from '@nestjs/config'; // Añadir ConfigService

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly configService: ConfigService, // Inyectar ConfigService
  ) {}

  // 🔹 Crear nuevo usuario y enviar correo de verificación
  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      const nuevoUsuario = await this.usuariosService.create(createUsuarioDto);
      return {
        message: 'Usuario creado correctamente. Verifica tu correo electrónico.',
        usuario: nuevoUsuario,
      };
    } catch (error) {
      console.error('❌ Error al crear usuario:', error);
      throw error;
    }
  }

  // 🔹 Endpoint para verificar el correo (vía enlace del correo)
  // Ejemplo de URL: http://localhost:3000/usuarios/verify?token=abcd-1234
  @Get('verify')
  async verifyEmail(@Query('token') token: string, @Res() res: Response) {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:5173'; // Default frontend URL

    if (!token) {
      return res.redirect(`${frontendUrl}/verify-email-status?status=error&message=${encodeURIComponent('El token de verificación es obligatorio.')}`);
    }

    try {
      await this.usuariosService.verifyEmail(token);
      return res.redirect(`${frontendUrl}/verify-email-status?status=success&message=${encodeURIComponent('Correo electrónico verificado exitosamente.')}`);
    } catch (error) {
      console.error('❌ Error al verificar correo:', error);
      let errorMessage = 'Error al verificar correo electrónico.';
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        errorMessage = error.message;
      }
      return res.redirect(`${frontendUrl}/verify-email-status?status=error&message=${encodeURIComponent(errorMessage)}`);
    }
  }

  // 🔹 Actualizar estado de verificación manualmente (por admin)
  @Patch('verify/:id')
  async updateVerificationStatus(
    @Param('id') id: string,
    @Body('status') status: number,
  ) {
    const userId = Number(id);
    if (isNaN(userId)) {
      throw new BadRequestException('El ID del usuario debe ser numérico.');
    }

    const updatedUser = await this.usuariosService.updateVerificationStatus(
      userId,
      !!status,
    );

    return {
      message: `Estado de verificación actualizado correctamente.`,
      usuario: updatedUser,
    };
  }

  // 🔹 Listar todos los usuarios (con filtro opcional por rol)
  @Get()
  async findAll(@Query('rol_id') rol_id?: string) {
    const roleId = rol_id ? Number(rol_id) : undefined;
    const usuarios = await this.usuariosService.findAll(roleId);
    return usuarios;
  }

  // 🔹 Obtener un usuario por su ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const userId = Number(id);
    if (isNaN(userId)) {
      throw new BadRequestException('El ID debe ser numérico.');
    }

    const usuario = await this.usuariosService.findOne(userId);
    if (usuario === null) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    return usuario;
  }

  // 🔹 Actualizar datos de un usuario
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    const userId = Number(id);
    if (isNaN(userId)) {
      throw new BadRequestException('El ID debe ser numérico.');
    }

    const usuarioActualizado = await this.usuariosService.update(
      userId,
      updateUsuarioDto,
    );

    return {
      message: 'Usuario actualizado correctamente.',
      usuario: usuarioActualizado,
    };
  }

  // 🔹 Eliminar un usuario
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const userId = Number(id);
    if (isNaN(userId)) {
      throw new BadRequestException('El ID debe ser numérico.');
    }

    const result = await this.usuariosService.remove(userId);
    return result;
  }
}
