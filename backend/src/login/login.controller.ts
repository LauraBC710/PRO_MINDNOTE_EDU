import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpCode,
  HttpStatus,
  UseGuards,
  UnauthorizedException,
  ForbiddenException,
  Query,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly jwtService: JwtService,
  ) {}

  // 🔹 Endpoint principal de inicio de sesión
  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() createLoginDto: CreateLoginDto) {
    try {
      return await this.loginService.login(createLoginDto);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return { success: false, mensaje: error.message };
      }
      if (error instanceof ForbiddenException) {
        return { success: false, mensaje: error.message };
      }
      throw error; // Otros errores no controlados
    }
  }

  // 🔹 Endpoint protegido para obtener el perfil del usuario logueado
  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  async getPerfil(@Req() req: any) {
    const { sub: usuario_id, correo: usuario_correo, rol: usuario_rol } = req.user;

    const user = await this.loginService.getUsuarioById(usuario_id);

    return {
      success: true,
      data: {
        usuario_id,
        usuario_nombre: user?.usuario_nombre || 'Usuario',
        usuario_apellido: user?.usuario_apellido || '',
        usuario_correo,
        usuario_rol,
      },
    };
  }

  // 🔹 Endpoints básicos (solo para desarrollo / pruebas)
  @Get()
  findAll() {
    return this.loginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.update(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }

  // 🔹 Endpoint para verificar el correo electrónico
  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    try {
      await this.loginService.verifyEmail(token);
      return { success: true, message: 'Correo electrónico verificado exitosamente.' };
    } catch (error: any) {
      throw new UnauthorizedException(error.message);
    }
  }
}
