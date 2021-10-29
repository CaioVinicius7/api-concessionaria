const Users = require("../models/users");
const login = require("../middlewares/autentication/login");
const { validationRules, validationRulesEdit, validationResult } = require("../middlewares/validations/users");

module.exports = (app) => {

   app.get("/listUser/:id", login, async (req, res) => {

      const { id } = req.params;

      try{
         const response = await Users.listUser(id);

         if(!response){
            return res.status(204).send();
         }

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   });

   app.get("/listUsers/:user?", login, async (req, res) => {

      const { user } = req.params;

      try{
         const response = await Users.listUsers(user);

         if(!response){
            return res.status(204).send();
         }

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

};