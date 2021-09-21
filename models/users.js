require("dotenv/config");
const con = require("./connection");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const { VerificationEmail } = require("./email"); 
const { sign, verify} = require("jsonwebtoken");

class Users{

   // Lista um usuário específico
   listUser(id, res){

      const sql = "SELECT * FROM users WHERE idUser = ?";
      
      con.query(sql, id, (error, result) => {

         if(error){
            return res.status(400).json(error);
         }

         if(!result[0]){
            return res.status(204).json();
         }

         // Formata a data e horário de criação e ultimo login
         const dateRegFormatted = moment(result[0].registerDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const lastLoginFormatted =  moment(result[0].lastLogin, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const formattedUser = { ...result[0], registerDate: dateRegFormatted, lastLogin: lastLoginFormatted };

         res.status(200).json(formattedUser);

      });

   }

   // Lista todos os usuários ou usuários pelo nome (filtro opcional)
   listUsers(user, res){

      const sql = (user) ? `SELECT * FROM users WHERE fullName like '${user}%'` : `SELECT * FROM users`;

      con.query(sql, (error, result) => {

         if(error){
            return res.status(400).json(error);
         }

         if(result.length < 1){
            return res.status(204).send();
         }

         const users = result.map((user) => {

            // Formata a data e horário de criação e ultimo login
            const dateRegFormatted = moment(user.registerDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
            const lastLoginFormatted =  (user.lastLogin != "Invalid Date") ? moment(user.lastLogin, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss") : "";
            const formattedUser = { ...user, registerDate: dateRegFormatted, lastLogin: lastLoginFormatted };

            return formattedUser;
            
         });

         res.status(200).json(users);
         
      });

   }

   // Adiciona um novo usuário
   addUser(data, res){

      // Verifica se o email já não está registrado
      const sqlVerifyEmail = `SELECT email FROM users WHERE email = ?`;

      con.query(sqlVerifyEmail, data.email, async (error, result) => {
         
         if(error){
            return res.status(400).json(error);
         }

         if(result.length >= 1){
               return res.status(400).json({ erro: "e-mail já registrado" });
         }

         // Recebe a data e horario do registro
         const regDate = moment().format("YYYY-MM-DD HH:mm:ss");
   
         // Criptografa a senha
         const encryptedPassword = await bcrypt.hash(data.password, 12);

         const formattedData = { ...data, password: encryptedPassword, registerDate: regDate, lastLogin: "0000-00-00 00:00:00", verifiedEmail: "no" };
         
         const sql = "INSERT INTO users SET ?";
   
         con.query(sql, formattedData, (error, result) => {
   
            if(error){
               return res.status(400).json(error);
            }

            const sqlEmail = "SELECT * FROM users WHERE email = ?";

            con.query(sqlEmail, formattedData.email, (error, result) => {

               if(error){
                  return res.status(400).json(error);
               }

               const verificationToken = sign({
                  idUser: result[0].idUser,
               }, process.env.JWT_KEY, {
                  expiresIn: "24h"
               });

               const url = process.env.BASE_URL + verificationToken;
               const verificationEmail = new VerificationEmail(formattedData, url);
               verificationEmail.sendEmail().catch(console.log);

            });

            res.status(200).json({
               status: "registro concluido",
               dadosUsuario: { 
                  usuario: formattedData.fullName, email: formattedData.email
               }
            });
   
         });

      });



   }

   // Edita os dados de um usuários
   editUser(id, data, res){

       // Verifica se existe um usuário cadastrado com o email
       const sqlVerifyEmail = "SELECT email FROM users WHERE email = ?";
      
       con.query(sqlVerifyEmail, data.email, (error, result) => {

          if(error){
             return res.status(400).json(error);
          }

          if(result.length >= 1){
             return res.status(400).json({ erro: "já existe um usuário cadastrado com esse email" });
          }
      
         // Verifica se existe um usuário com esse id
         const sqlVerify = "SELECT idUser, registerDate, lastLogin FROM users WHERE idUser = ?";
      
         con.query(sqlVerify, id, async (error, result) => {

            if(error){
               return res.status(400).json(error);
            }

            if(result.length < 1){
               return res.status(400).json({ erro: "nenhum usuário encontrado com esse id" });
            }
   
            // Formata a senha e a data do ultimoLogin caso o usuário ainda não tenha logado
            const encryptedPassword = await bcrypt.hash(data.password, 12);
            const regDate = result[0].registerDate;
            const lastLogin = (!moment(result[0].lastLogin).isValid()) ? "0000-00-00 00:00:00" : result[0].lastLogin;
   
            const formattedData = { ...data, password: encryptedPassword, registerDate: regDate, lastLogin: lastLogin };
   
            const sql = "UPDATE users SET ? WHERE idUser = ?";
            
            con.query(sql, [formattedData, id], (error, result) => {
               
               if(error){
                  return res.status(400).json(error);
               }
   
               res.status(200).json({ 
                  status: "Usuário editado com sucesso",
                  id: id
               });
               
               
            });
   
   
         });

      });

   }

   // Exclui os dados de um usuário
   deleteUser(id, res){

      const sqlVerify = "SELECT idUser FROM users WHERE idUser = ?";

      con.query(sqlVerify, id, (error, result) => {

         if(error){
            return res.status(400).json(error);
         }

         if(result.length < 1){
            return res.status(400).json({ erro: "nenhum usuário encontrado com esse id" });
         }

         const sql = "DELETE FROM users WHERE idUser = ?";

         con.query(sql, id, (error, result) => {
            
            if(error){
               return res.status(400).json(error);
            }

            res.status(200).json({ 
               status: "usuário excluido", 
               id: id
            });
            

         });

      });

   }

   verifyEmail(token, res){

      try{

         const decode = verify(token, process.env.JWT_KEY);
         const { idUser: id } = decode;
   
         const sql = "UPDATE users SET verifiedEmail = ? WHERE idUser = ?";
   
         con.query(sql, ["yes", id], (error, result) => {
   
            if(error){
               return res.status(400).json(error);
            }
   
            res.status(200).json({ status: "e-mail verificado com sucesso" });

         });

      }catch(error){

         if(error.name === "TokenExpiredError"){
            return res.status(401).json(error);
         }
         
         if(error.name === "JsonWebTokenError"){
            return res.status(401).json(error);
         }

         res.status(500).json({ erro: error.message });

      }



   }

}

module.exports = new Users;