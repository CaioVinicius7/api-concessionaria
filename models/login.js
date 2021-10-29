require("dotenv/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptJs");
const moment = require("moment");
const blacklist = require("../redis/blacklist");
const whitelist = require("../redis/whitelist");
const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Login{

   async login(data){

      const result = await prisma.users.findUnique({
         where: {
            email: data.email
         }
      });

      if(!result){
         return null;
      }

      // Compara a senha
      const compareResult = await bcrypt.compare(data.password, result.password);

      if(!compareResult){
         return null;
      }
      
      // Atualiza a data do ultimo login
      await prisma.users.update({
         where: {
            id: result.id
         },
         data: {
            lastLogin: new Date()
         }
      });

      // Cria o refresh token
      const refreshToken = crypto.randomBytes(24).toString("hex");
      // Define a data de expiração para daqui 5 dias e tranforma em unix timestamp
      const expireDateRefreshToken = moment().add(5, "d").unix();
      await whitelist.addToken(refreshToken, result.id, expireDateRefreshToken);

      // Cria o token
      const token = jwt.sign({
         id: result.id,
         fullName: result.fullName,
         email: result.email 
      }, process.env.JWT_KEY, {
         expiresIn: "1h"
      });

      return {
         header: {
            authorization: token
         },
         body: {
            status: "autenticado com sucesso!",
            refreshToken: refreshToken
         }
      }; 

   }

   async refresh(user, token){

      const { id } = user;

      const { fullName, email } = await prisma.users.findUnique({
         where: {
            id: id
         }
      });

      // Cria o refresh token
      const refreshToken = crypto.randomBytes(24).toString("hex");
      // Define a data de expiração para daqui 5 dias e tranforma em unix timestamp
      const expireDateRefreshToken = moment().add(5, "d").unix();
      await whitelist.addToken(refreshToken, id, expireDateRefreshToken);
      await blacklist.addToken(token);

      // Cria o token
      const newToken = jwt.sign({
         id: id,
         fullName: fullName,
         email: email 
      }, process.env.JWT_KEY, {
         expiresIn: "1h"
      });

      return {
         header: {
            authorization: newToken
         },
         body: {
            status: "autenticado com sucesso!",
            refreshToken: refreshToken
         }
      };
         
   }

   async logout(token){

      // Adiciona o token a blacklist
      await blacklist.addToken(token);

      return { 
         status: "desconectado com sucesso"
      };

   }

}

module.exports = new Login;