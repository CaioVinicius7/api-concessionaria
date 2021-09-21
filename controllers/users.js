const Users = require("../models/users");
const login = require("../middlewares/autentication/login");
const { validationRules, validationRulesEdit, validationResult } = require("../middlewares/validations/users");

module.exports = (app) => {

   app.get("/listUser/:id", login, async (req, res) => {
      const { id } = req.params;
      await Users.listUser(id, res);
   });

   app.get("/listUsers/:user?", login, async (req, res) => {
      const { user } = req.params;
      await Users.listUsers(user, res);
   });

   app.post("/addUser", login, validationRules, async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

      const { body: data } = req;
      await Users.addUser(data, res);
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
      await Users.editUser(id, data, res);
   });

   app.delete("/deleteUser/:id", login, async (req, res) => {
      const { id } = req.params;
      await Users.deleteUser(id, res);
   });

   app.get("/verifyEmail/:token", async (req, res) => {
      const { token } = req.params;
      await Users.verifyEmail(token, res); 
   });

}