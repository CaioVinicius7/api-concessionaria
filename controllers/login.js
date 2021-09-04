const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptJs");
const Autenticacao = require("../models/login");
const login = require("../middlewares/autentication/login");
const { regrasValidacao, validationResult } = require("../middlewares/validations/login");

module.exports = (app) => {


   app.post("/login", regrasValidacao, (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

      const dadosLogin = req.body;
      Autenticacao.login(dadosLogin, res);
   });

   app.delete("/logout", login, (req, res) => {
      Autenticacao.logout(req, res);
   });

}