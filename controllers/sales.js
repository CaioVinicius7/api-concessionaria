const Sales = require("../models/sales");
const login = require("../middlewares/autentication/login");
const { validationRules, validationRulesEdit, validationResult } = require("../middlewares/validations/sales");

module.exports = (app) => {

   app.get("/listSale/:id", login, async (req, res) => {

      const { id } = req.params;

      try{
         const response = await Sales.listSale(id);

         if(!response){
            return res.status(204).send();
         }

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   });

   app.get("/listSales", login, async (req, res) => {
      try{
         const response = await Sales.listSales();

         if(!response){
            return res.status(204).send();
         }

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }
   });

   // Adiciona uma nova venda
   app.post("/addSale", validationRules, login, async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

      const { body } = req;

      const data = { 
         sellValue: parseFloat(body.sellValue),
         idClient: Number(body.idClient),
         idVehicle: Number(body.idVehicle),
         sellDate: new Date(),
      }; 

      try{
         const response = await Sales.addSale(data);
         
         if(response.erro){
            return res.status(400).json(response);
         }

         return res.status(201).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   });

   // Edita os dados de uma venda
   app.patch("/editSale/:id", validationRulesEdit, login, async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

      const { id } = req.params;
      const { body } = req;
      
      const data = {
         ...body,
         sellValue: parseFloat(body.sellValue),
         idVehicle: Number(body.idVehicle),
         idClient: Number(body.idClient)
      };

      try{
         const response = await Sales.editSale(id, data);

         if(response.erro){
            return res.status(400).json(response);
         }

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   });

   // Deleta uma venda
   app.delete("/deleteSale/:id", login, async (req, res) => {

      const { id } = req.params;

      try{
         const response = await Sales.deleteSale(id);

         if(response.erro){
            return res.status(400).json(response);
         }
         
         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   });

};