const Users = require("../models/users");
const login = require("../middlewares/autentication/login");
const { validationRules, validationRulesEdit, validationResult } = require("../middlewares/validations/users");

module.exports = (app) => {
   
   app.get("/listUser/:id", login, async (req, res) => {
      const id = req.params.id;
      await Users.listUser(id, res);
   });

   app.get("/listUsers/:user?", login, async (req, res) => {
      const name = req.params.user;
      await Users.listUsers(name, res);
   });

   app.post("/addUser", login, validationRules, async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

      const data = req.body;
      await Users.addUser(data, res);
   });

   app.patch("/editUser/:id", login, validationRulesEdit, async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }
      
      const id = req.params.id;
      const data = req.body;
      await Users.editUser(id, data, res);
   });

   app.delete("/deleteUser/:id", login, async (req, res) => {
      const id = req.params.id;
      await Users.deleteUser(id, res);
   });

}