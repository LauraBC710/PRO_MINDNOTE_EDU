# Imagen base de Node
FROM node:20

# Crear carpeta de trabajo
WORKDIR /app

# Copiar archivo de dependencias primero
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código del frontend
COPY . .

# Exponer el puerto del frontend
EXPOSE 5173

# Iniciar el servidor de desarrollo / producción
CMD ["npm", "run", "dev"]
