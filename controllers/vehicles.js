const Vehicles = require("../models/Vehicles");
const { validationRules, validationRulesEdit, validationResult, validationRulesSale } = require("../middlewares/validations/Vehicles");
const { upload } = require("../middlewares/uploads/uploadImagem");
const login = require("../middlewares/autentication/login");
const fs = require("fs");

module.exports = (app) => {

   // Lista todos os veiculos registrados
   app.get("/listVehicles/:status?", async (req, res) => {
      await Vehicles.listVehicles(req, res);
   });

   // Lista todos os veiculos por tipo 
   app.get("/listVehiclesByType/:type", async (req, res) => {
      const type = req.params.type; 
      await Vehicles.listVehiclesByType(type, res);
   });

   // Lista todos os veiculos por modelo 
   app.get("/listVehiclesByModel/:model", async (req, res) => {
      const model = req.params.model;
      await Vehicles.listVehiclesByModel(model, res);
   });

   // Lista um veiculo específico
   app.get("/listVehicle/:id", async (req, res) => {
      const id = req.params.id;
      await Vehicles.listVehicle(id, res);
   });

   // Adiciona um novo veiculo
   app.post("/addVehicle", login, [upload.single("img"), validationRules], async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      const imgPath = req.file.path;

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         fs.unlink(imgPath, (error) => {
            if(error){
               res.status(404).json(error);
            }
         });
         return res.status(400).json({ errors: validationErros.array() });
      }

      const data = { ...req.body, img: imgPath };
      
      await Vehicles.addVehicle(data, res);
   });

   // Define o status de um veículo como vendido
   app.patch("/sellVehicle/:id", login, validationRulesSale, async (req, res) => {

      const id = req.params.id;
      const sellDate = req.body.dataVenda;

      // Guarda os erros de validação
      const validationErros = validationResult(req);
      
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

      await Vehicles.sellVehicle(id, sellDate, res);      
   });

   // Edita um veiculo
   app.patch("/editVehicle/:id", login, [upload.single("img"), validationRulesEdit], async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      const imgPath = req.file.path;

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         fs.unlink(imgPath, (error) => {
            if(error){
               res.status(404).json(error);
            }
         });
         return res.status(400).json({ errors: validationErros.array() });
      }

      const id = parseInt(req.params.id);
      const data = { ...req.body, img: imgPath };

      await Vehicles.editVehicle(id, data, res);
   });

   // Exclui um veiculo
   app.delete("/deleteVehicle/:id", login, async (req, res) => {
      const id = req.params.id;

      await Vehicles.deleteVehicle(id, res);
   });

}