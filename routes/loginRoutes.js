const express = require("express");
const router = express.Router();
const login = require("../middlewares/autentication/login");
const refreshToken = require("../middlewares/autentication/refreshToken");
const { validationRules, validationRulesRt, validationResult } = require("../middlewares/validations/login");
const Login = require("../controllers/login");

router.post("/login", validationRules, async (req, res) => {

   // Guarda os erros de validação
   const validationErros = validationResult(req);

   // Verifica se ocorreu algum erro
   if(!validationErros.isEmpty()){
      return res.status(400).json({ errors: validationErros.array() });
   }

   await Login.login(req, res);

});

router.post("/refreshToken", [login, refreshToken, validationRulesRt], async (req, res) => {

   // Guarda os erros de validação
   const validationErros = validationResult(req);

   // Verifica se ocorreu algum erro
   if(!validationErros.isEmpty()){
      return res.status(400).json({ errors: validationErros.array() });
   }

   await Login.refreshToken(req, res);

});

router.delete("/logout", [login, refreshToken], async (req, res) => {
   await Login.logout(req, res);
});

module.exports = router;