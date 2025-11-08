import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Habilita validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no incluidas en el DTO
      forbidNonWhitelisted: true, // lanza error si mandan campos extra
      transform: true, // convierte tipos automáticamente (string -> number)
    }),
  );

  // ✅ CORS
  app.enableCors();

  // ✅ Inicializa PrismaService
  const prismaService = app.get(PrismaService);

  // ✅ Crea rol por defecto si no existe
  await ensureDefaultRole(prismaService);

  // ✅ Puerto
  let port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3002;

  try {
    await app.listen(port);
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  } catch (error) {
    if ((error as any).code === 'EADDRINUSE') {
      console.warn(`Puerto ${port} en uso, intentando con el siguiente puerto...`);
      port = port + 1; // Intenta con el siguiente puerto
      await app.listen(port);
      console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    } else {
      throw error; // Si es otro error, relanzar
    }
  }
}

async function ensureDefaultRole(prismaService: PrismaService) {
  const defaultRoleName = 'Usuario';

  let defaultRole = await prismaService.rol.findUnique({
    where: { rol_nombre: defaultRoleName },
  });

  if (!defaultRole) {
    defaultRole = await prismaService.rol.create({
      data: { rol_nombre: defaultRoleName },
    });
    console.log(`✅ Rol '${defaultRoleName}' creado con ID: ${defaultRole.rol_id}`);
  } else {
    console.log(`ℹ️ Rol '${defaultRoleName}' ya existe con ID: ${defaultRole.rol_id}`);
  }
}

bootstrap();
