# Se baseia na imagem do node com a ultima versão
FROM node:16.13.1

# Diretório onde se inicializará o container após iniciado
WORKDIR /var/www

# Coloca o código dentro da imagem
COPY . /var/www

# Executa o comando quando a imagem for construida
RUN npm install
RUN npx prisma migrate deploy
RUN npx prisma db seed

# Comando de entrada após executar o container
ENTRYPOINT npm start

# Define a porta que o container irá usar
EXPOSE 3000