# Usa la imagen base oficial de Bun
FROM oven/bun:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instala git
RUN apt-get update && apt-get install -y git

# Clona el repositorio
RUN git clone https://github.com/keaguirre/registraBot .

# Instala las dependencias
RUN bun install

# Comenta la línea CMD para acceder a Bash
# CMD ["bun", "run", "index.js"]
#docker build -t registra-bot .
#docker run -it [containerName] /bin/bash