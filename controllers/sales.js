const Sales = require("../models/sales");
const login = require("../middlewares/autentication/login");
const { validationRules, validationRulesEdit, validationResult } = require("../middlewares/validations/sales");

module.exports = (app) => {

   app.get("/listSale/:id", login, async (req, res) => {
      const { id } = req.params;
      await Sales.listSale(id, res);
   });

   app.get("/listSales", login, async (req, res) => {
      await Sales.listSales(res);
   });

   // Adiciona uma nova venda
   app.post("/addSale", validationRules, login, async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

      const { body: data } = req; 

      await Sales.addSale(data, res);      
   });

   // Edita os dados de uma venda
   app.patch("/editSale/:id", validationRules, login, async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

      const { id } = req.params;
      const { body: data } = req; 

      await Sales.editSale(id, data, res);

   });

   // Deleta uma venda
   app.delete("/deleteSale/:id", login, async (req, res) => {
      const { id } = req.params;
      await Sales.deleteSale(id, res);
   });

}