require("dotenv/config");
const con = require("./connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptJs");
const moment = require("moment");

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
         
         bcrypt.compare(data.password, result[0].password, (error, resultCompare) => {
            
            if(error){
               return res.status(401).json({ erro: "e-mail ou senha incorretos" });
            }

            if(resultCompare){

               const lastLogin = moment().format("YYYY-MM-DD HH:mm:ss");

               const sql = "UPDATE users SET lastLogin = ? WHERE idUser = ?";

               con.query(sql, [lastLogin, result[0].idUser]);

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
                        status: "autenticado com sucesso!"
                      });

            }

            res.status(401).json({ erro: "senha incorreta! tente novamente" });

         }); 
         
      });

   }

   logout(req, res){

      res.status(200).json({ status: "preciso terminar" });


   }

}

module.exports = new Login;