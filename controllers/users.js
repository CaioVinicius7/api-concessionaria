const Users = require("../models/users");
const login = require("../middlewares/autentication/login");
const { ResetPasswordEmail } = require("../functions/email"); 
const { sign, verify } = require("jsonwebtoken");
const { validationRules, validationRulesEdit, validationResult } = require("../middlewares/validations/users");
const DataFormat = require("../functions/dataFormat");

module.exports = (app) => {

   app.get("/listUser/:id", login, async (req, res) => {

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

   });

   app.get("/listUsers/:user?", login, async (req, res) => {

      const { user } = req.params;

      try{
         let response = await Users.listUsers(user);

         if(!response){
            return res.status(204).send();
         }

         response = DataFormat.users(response); 

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   });

   app.post("/addUser", login, validationRules, async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

      const { body: data } = req;

      try{
         const response = await Users.addUser(data);

         if(response.erro){
            return res.status(400).json(response);
         }

         return res.status(201).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   });

   app.patch("/editUser/:id", login, validationRulesEdit, async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }
      
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

   });

   app.delete("/deleteUser/:id", login, async (req, res) => {

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

   });

   app.get("/verifyEmail/:token", async (req, res) => {

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

   });

   // Dispara o email para redefinir a senha
   app.get("/resetPassword", async (req, res) => {
      
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
      
   });

   // Redefine a senha
   app.patch("/changePassword/:token", async (req, res) => {

      // Recupera o email do jwt
      const { token } = req.params;
      const decode = verify(token, process.env.JWT_KEY);
      const { email } = decode;

      const { password } = req.body;

      try{
         const response = await Users.changePassword(email, password);
         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   });



};