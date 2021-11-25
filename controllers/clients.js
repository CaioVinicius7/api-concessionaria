const Clients = require("../models/clients");
const login = require("../middlewares/autentication/login");
const { validationRules, validationRulesEdit, validationResult } = require("../middlewares/validations/clients");
const DataFormat = require("../functions/dataFormat");

module.exports = (app) => {

   app.get("/listClient/:id", login, async (req, res) => {

      const { id } = req.params;
      
      try{
         let response = await Clients.listClient(id, res);

         if(!response){
            return res.staus(204).send();
         }

         response = DataFormat.client(response);

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   });

   app.get("/listClients/:client?", login, async (req, res) => {

      const { client } = req.params;

      try{
         let response = await Clients.listClients(client);

         if(!response){
            return res.status(204).send();
         }

         response = DataFormat.clients(response);

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   });

   app.post("/addClient", validationRules, login, async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

      const { body: data } = req;

      try{
         const response = await Clients.addClient(data);

         if(response.erro){
            return res.status(400).json(response);
         }

         return res.status(201).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

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

      try{
         const response = await Clients.editClient(id, data);

         if(response.erro){
            return res.status(400).json(response);
         }

         return res.status(201).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   });

   app.delete("/deleteClient/:id", login, async (req, res) => {

      const { id } = req.params;

      try{
         const response = await Clients.deleteClient(id);

         if(response.erro){
            return res.status(400).json(response);
         }

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   });


};