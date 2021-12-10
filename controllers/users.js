require("dotenv/config");
const Users = require("../models/users");
const { VerificationEmail, ResetPasswordEmail } = require("../functions/email"); 
const { sign, verify } = require("jsonwebtoken");
const DataFormat = require("../functions/dataFormat");

class usersControllers{

   // Lista um usuário
   async listUser(req, res){

      const { id } = req.params;

      try{
         let response = await Users.listUser(id);

         if(!response){
            return res.status(204).send();
         }

         response = DataFormat.user(response); 

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Lista todos usuário 
   async listUsers(req, res){

      const { page } = req.params;
      
      try{
         let response = await Users.listUsers(page);

         if(!response){
            return res.status(204).send();
         }

         response = DataFormat.users(response); 

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Lista usuários por nome
   async listUsersByName(req, res){

      const { user } = req.params;
      const { page } = req.params;
      
      try{
         let response = await Users.listUsersByName(user, page);

         if(!response){
            return res.status(204).send();
         }

         response = DataFormat.users(response); 

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   }
      
   // Adiciona um usuário
   async addUser(req, res){

      const { body: data } = req;

      // Match de senha
      if(data.password !== data.confirmPassword){
         return res.status(400).json({
            erro: "As senhas precisam ser iguais"
         });
      }

      try{
         const response = await Users.addUser(data);

         if(response.erro){
            return res.status(400).json(response);
         }

         // Envio de email ao cadastrar usuário
         const { verificationToken } = response.sendMail;
         const { formattedData } = response.sendMail;

         const url = process.env.BASE_URL + verificationToken;
         const verificationEmail = new VerificationEmail(formattedData, url);
         verificationEmail.sendEmail().catch(console.log);

         return res.status(201).json(response.info);
      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Edita um usuário
   async editUser(req, res){

      const { id } = req.params;
      const { body: data } = req;

      try{
         const response = await Users.editUser(id, data);

         if(response.erro){
            return res.status(400).json(response);
         }

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Deleta um usuário
   async deleteUser(req, res){

      const { id } = req.params;

      try{
         const response = await Users.deleteUser(id, res);

         if(response.erro){
            return res.status(400).json(response);
         }

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Verifica o email do usuário
   async verifyEmail(req, res){
   
      const { token } = req.params;

      try{

         const response = await Users.verifyEmail(token);
         return res.status(200).json(response);

      }catch(error){

         if(error.name === "TokenExpiredError"){
            return res.status(401).json(error);
         }
         
         if(error.name === "JsonWebTokenError"){
            return res.status(401).json(error);
         }

         return res.status(500).json({ erro: error.message });

      }

   }

   // Dispara o email para redefinir a senha
   async resetPassword(req, res){

      const { email } = req.body;

      const resetPasswordToken = sign({
         email: email,
      }, process.env.JWT_KEY, {
         expiresIn: "24h"
      });

      const url = process.env.BASE_URL_RESET + resetPasswordToken;
      const resetPasswordEmail = new ResetPasswordEmail(email, url);
      resetPasswordEmail.sendEmail().catch(console.log);

      return res.status(200).json({
         status: `Siga os passos do e-mail enviado para ${email} para redefinir sua senha`
      });

   }

   // Redefine a senha
   async changePassword(req, res){

      // Recupera o email do jwt
      const { token } = req.params;
      const decode = verify(token, process.env.JWT_KEY);
      const { email } = decode;

      const { password } = req.body;
      const { confirmPassword } = req.body;

      // Match de senha
      if(password !== confirmPassword){
         return res.status(400).json({
            erro: "As senhas precisam ser iguais"
         });
      }

      try{
         const response = await Users.changePassword(email, password);
         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   }

}

module.exports = new usersControllers;