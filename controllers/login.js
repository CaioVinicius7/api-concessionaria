const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptJs");
const Login = require("../models/login");
const login = require("../middlewares/autentication/login");
const { validationRules, validationResult } = require("../middlewares/validations/login");

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

   app.delete("/logout", login, (req, res) => {
      Login.logout(req, res);
   });

}