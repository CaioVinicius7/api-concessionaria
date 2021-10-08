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

   async login(data, res){

      try{

         const result = await prisma.users.findUnique({
            where: {
               email: data.email
            }
         });

         if(!result){
            return res.status(400).json({ erro: "e-mail ou senha incorretos" });
         }

         // COmpara a senha
         bcrypt.compare(data.password, result.password, async (error, resultCompare) => {
            
            if(error){
               return res.status(401).json({ erro: "e-mail ou senha incorretos" });
            }

            if(resultCompare){

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

               return res.set("Authorization", token),
                      res.status(200).json({ 
                        status: "autenticado com sucesso!",
                        refreshToken: refreshToken
                      });

            }

            return res.status(401).json({ erro: "e-mail ou senha incorretos" });

         });

      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   async refresh(req, res){

      const { id } = req.user;

      try{

         const result = await prisma.users.findUnique({
            where: {
               id: id
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

         return res.set("Authorization", token),
                res.status(200).json({ 
                  status: "autenticado com sucesso!",
                  refreshToken: refreshToken
                });
         
      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   async logout(req, res){

      try{

         // Adiciona o token a blacklist
         const token = req.headers.authorization.split(" ")[1];
         await blacklist.addToken(token);

         return res.status(200).json({ status: "desconectado com sucesso" });

      }catch(error){

         return res.status(500).json({
            status: "ocorreu um erro ao se desconectar do sistema",
            erro: error
         });

      }


   }

}

module.exports = new Login;