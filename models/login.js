require("dotenv/config");
const con = require("./connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptJs");
const moment = require("moment");
const blacklist = require("../redis/blacklist");
const whitelist = require("../redis/whitelist");
const crypto = require("crypto");

class Login{

   login(data, res){

      const sqlVerify = "SELECT * FROM users WHERE email = ?";
      
      con.query(sqlVerify, data.email, (error, result) => {
         
         if(error){
            return res.status(400).json(error);
         }
            
         if(result.length < 1){
            return res.status(400).json({ erro: "e-mail ou senha incorretos" });
         }
         
         bcrypt.compare(data.password, result[0].password, async (error, resultCompare) => {
            
            if(error){
               return res.status(401).json({ erro: "e-mail ou senha incorretos" });
            }

            if(resultCompare){

               const lastLogin = moment().format("YYYY-MM-DD HH:mm:ss");

               const sql = "UPDATE users SET lastLogin = ? WHERE idUser = ?";

               con.query(sql, [lastLogin, result[0].idUser]);

               // Cria o refresh token
               const refreshToken = crypto.randomBytes(24).toString("hex");
               // Define a data de expiração para daqui 5 dias e tranforma em unix timestamp
               const expireDateRefreshToken = moment().add(5, "d").unix();
               await whitelist.addToken(refreshToken, result[0].idUser, expireDateRefreshToken);

               // Cria o token
               const token = jwt.sign({
                  idUser: result[0].idUser,
                  fullName: result[0].fullName,
                  email: result[0].email 
               }, process.env.JWT_KEY, {
                  expiresIn: "1h"
               });

               return res.set("Authorization", token),
                      res.status(200).json({ 
                        status: "autenticado com sucesso!",
                        refreshToken: refreshToken
                      });

            }

            res.status(401).json({ erro: "senha incorreta! tente novamente" });

         }); 
         
      });

   }

   refresh(req, res){

      const { idUser } = req.user;

      const sql = "SELECT * FROM users WHERE idUser = ?";

      con.query(sql, idUser, async (error, result) => {

         if(error){
            return res.status(400).json(error);
         }

         // Cria o refresh token
         const refreshToken = crypto.randomBytes(24).toString("hex");
         // Define a data de expiração para daqui 5 dias e tranforma em unix timestamp
         const expireDateRefreshToken = moment().add(5, "d").unix();
         await whitelist.addToken(refreshToken, result[0].idUser, expireDateRefreshToken);

         // Cria o token
         const token = jwt.sign({
            idUser: result[0].idUser,
            fullName: result[0].fullName,
            email: result[0].email 
         }, process.env.JWT_KEY, {
            expiresIn: "1h"
         });

         return res.set("Authorization", token),
                res.status(200).json({ 
                  status: "autenticado com sucesso!",
                  refreshToken: refreshToken
                });

      });

   }

   logout(req, res){

      try{

         // Adiciona o token a blacklist
         const token = req.headers.authorization.split(" ")[1];
         blacklist.addToken(token);

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