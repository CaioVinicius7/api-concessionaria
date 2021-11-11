const Login = require("../models/login");
const login = require("../middlewares/autentication/login");
const { validationRules, validationRulesRt, validationResult } = require("../middlewares/validations/login");
const refreshToken = require("../middlewares/autentication/refreshToken");

module.exports = (app) => {

   // Faz login
   app.post("/login", validationRules, async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

      const { body: data } = req;

      try{
         const response = await Login.login(data);

         if(!response){
            return res.status(401).json({ erro: "e-mail ou senha incorretos" });
         }

         return res.set(response.header),
                res.status(200).json(response.body);
      }catch(error){
         return res.status(500).json(error.message);
      }
      
   });
   
   // Gera o refresh token
   app.post("/refreshToken", [login, refreshToken, validationRulesRt], async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

      const token = req.headers.authorization.split(" ")[1];
      const { user } = req;

      try{
         const response = await Login.refresh(user, token, res);
         return res.set(response.header),
                res.status(200).json(response.body);
      }catch(error){
         return res.status(500).json(error.message);
      }

   });

   // Faz logout
   app.delete("/logout", [login, refreshToken], async (req, res) => {

      const token = req.headers.authorization.split(" ")[1];
      
      try{
         const response = await Login.logout(token);
         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   });

};