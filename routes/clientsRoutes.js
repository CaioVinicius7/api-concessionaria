const express = require("express");
const router = express.Router();
const login = require("../middlewares/autentication/login");
const { validationRules, validationRulesEdit, validationResult } = require("../middlewares/validations/clients");
const Clients = require("../controllers/clients");


router.get("/client/:id", login, async (req, res) => {
   await Clients.listClient(req, res);
});

router.get("/clients/:page?", login, async (req, res) => {
   await Clients.listClients(req, res);
});

router.get("/clients/:name/:page?", login, async (req, res) => {
   await Clients.listClientsByName(req, res);
});

router.post("/clients", login, validationRules, async (req, res) => {

   const validationErros = validationResult(req);

   if(!validationErros.isEmpty()){
      return res.status(400).json({ errors: validationErros.array() });
   }

   await Clients.addClient(req, res);
});

router.patch("/clients/:id", login, validationRulesEdit, async (req, res) => {

   const validationErros = validationResult(req);

   if(!validationErros.isEmpty()){
      return res.status(400).json({ errors: validationErros.array() });
   }

   await Clients.editClient(req, res);
});

router.delete("/clients/:id", login, async (req, res) => {
   await Clients.deleteClient(req, res);
});

module.exports = router;