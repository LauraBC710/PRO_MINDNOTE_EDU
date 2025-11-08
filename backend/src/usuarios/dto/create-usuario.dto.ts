import { IsString, IsEmail, MinLength, IsInt, IsOptional } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  usuario_nombre!: string;

  @IsString()
  usuario_apellido!: string;

  @IsEmail()
  usuario_correo!: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  usuario_contrasena!: string;

  @IsInt()
  @IsOptional() // rol_id can be optional if default is handled by service
  rol_id!: number;
}
