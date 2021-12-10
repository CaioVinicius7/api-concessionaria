const express = require("express");
const router = express.Router();
const login = require("../middlewares/autentication/login");
const { validationRules, validationRulesEdit, validationResult } = require("../middlewares/validations/users");
const Users = require("../controllers/users");

router.get("/user/:id", login, async (req, res) => {
   await Users.listUser(req, res);
});

router.get("/users/:page?", login, async (req, res) => {
   await Users.listUsers(req, res);
});

router.get("/users/:user/:page?", login, async (req, res) => {
   await Users.listUsersByName(req, res);
});

router.post("/users", login, validationRules, async (req, res) => {

   // Guarda os erros de validação
   const validationErros = validationResult(req);

   // Verifica se ocorreu algum erro
   if(!validationErros.isEmpty()){
      return res.status(400).json({ errors: validationErros.array() });
   }

   await Users.addUser(req, res);
});

router.patch("/users/:id", login, validationRulesEdit, async (req, res) => {
 
   // Guarda os erros de validação
   const validationErros = validationResult(req);

   // Verifica se ocorreu algum erro
   if(!validationErros.isEmpty()){
      return res.status(400).json({ errors: validationErros.array() });
   }

   await Users.editUser(req, res);
});

router.delete("/users/:id", login, async (req, res) => {
   await Users.deleteUser(req, res);
});

router.get("/verifyEmail/:token", async (req, res) => {
   await Users.verifyEmail(req, res);
});

router.post("/resetPassword", async (req, res) => {
   await Users.resetPassword(req, res);
});

router.patch("/changePassword/:token", async (req, res) => {
   await Users.changePassword(req, res);
});

module.exports = router;