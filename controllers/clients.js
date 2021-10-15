const Clients = require("../models/clients");
const login = require("../middlewares/autentication/login");
const { validationRules, validationRulesEdit, validationResult } = require("../middlewares/validations/clients");

module.exports = (app) => {

   app.get("/listClient/:id", login, async (req, res) => {
      const { id } = req.params;
      await Clients.listClient(id, res);
   });

   app.get("/listClients/:client?", login, async (req, res) => {
      const { client } = req.params;
      await Clients.listClients(client, res);
   });

   app.post("/addClient", validationRules, login, async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

      const { body: data } = req;
      await Clients.addClient(data, res);
   });

   app.patch("/editClient/:id", validationRulesEdit, login, async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }
      
      const { id } = req.params;
      const { body: data } = req;
      await Clients.editClient(id, data, res);
   });

   app.delete("/deleteClient/:id", login, async (req, res) => {
      const { id } = req.params;
      await Clients.deleteClient(id, res);
   });


}