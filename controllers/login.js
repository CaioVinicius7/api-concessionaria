const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptJs");
const Login = require("../models/login");
const login = require("../middlewares/autentication/login");
const { validationRules, validationRulesRt, validationResult } = require("../middlewares/validations/login");
const whitelist = require("../redis/whitelist");
const refreshToken = require("../middlewares/autentication/refreshToken");

module.exports = (app) => {


   app.post("/login", validationRules, (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

      const dadosLogin = req.body;
      Login.login(dadosLogin, res);
   });
   
   app.post("/refreshToken", [login, refreshToken, validationRulesRt], async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

      Login.refresh(req, res);
   });

   app.delete("/logout", [login, refreshToken], async (req, res) => {
      await Login.logout(req, res);
   });

}