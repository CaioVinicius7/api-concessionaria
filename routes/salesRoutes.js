const express = require("express");
const router = express.Router();
const login = require("../middlewares/autentication/login");
const { validationRules, validationRulesEdit, validationResult } = require("../middlewares/validations/sales");
const Sales = require("../controllers/sales");

router.get("/sale/:id", login, async (req, res) => {
   await Sales.listSale(req, res);
});

router.get("/sales", login, async (req, res) => {
   await Sales.listSales(res);
});

router.post("/sales", validationRules, login, async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);
   
      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

		await Sales.addSale(req, res);

});

router.patch("/sales/:id", validationRulesEdit, login, async (req, res) => {

   // Guarda os erros de validação
   const validationErros = validationResult(req);

   // Verifica se ocorreu algum erro
   if(!validationErros.isEmpty()){
      return res.status(400).json({ errors: validationErros.array() });
   }

   await Sales.editSale(req, res);

});

router.delete("/sales/:id", login, async (req, res) => {
   await Sales.deleteSale(req, res);
});

module.exports = router;