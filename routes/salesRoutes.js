const express = require("express");
const router = express.Router();
const login = require("../middlewares/autentication/login");
const { validationRules, validationRulesEdit, validationResult } = require("../middlewares/validations/sales");
const Sales = require("../controllers/sales");

router.get("/sale/:id", login, async (req, res) => {
   await Sales.listSale(req, res);
});

router.get("/sales/:page?", login, async (req, res) => {
   await Sales.listSales(req, res);
});

router.post("/sales", validationRules, login, async (req, res) => {

      const validationErros = validationResult(req);
   
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

		await Sales.addSale(req, res);

});

router.patch("/sales/:id", validationRulesEdit, login, async (req, res) => {

   const validationErros = validationResult(req);

   if(!validationErros.isEmpty()){
      return res.status(400).json({ errors: validationErros.array() });
   }

   await Sales.editSale(req, res);

});

router.delete("/sales/:id", login, async (req, res) => {
   await Sales.deleteSale(req, res);
});

module.exports = router;