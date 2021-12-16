# Versão do mysql
FROM mysql:latest

# Variável de ambiente
ENV MYSQL_ROOT_PASSWORD=mysqllocal

# Utiliza a porta 3307
EXPOSE 3307