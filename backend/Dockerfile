# Imagen base (usa Node 20 para compatibilidad con Prisma)
FROM node:20

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci --only=production

# Copiar el resto del código del proyecto
COPY . .

# Generar cliente de Prisma (si lo usas)
RUN npx prisma generate

# Crear un usuario no root para ejecutar la aplicación
RUN useradd --create-home --shell /bin/bash appuser
USER appuser

# Exponer el puerto del backend
EXPOSE 3000

# Comando de arranque en producción
CMD ["npm", "run", "start"]