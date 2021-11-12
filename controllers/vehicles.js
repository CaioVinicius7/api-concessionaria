const Vehicles = require("../models/Vehicles");
const { validationRules, validationRulesEdit, validationResult } = require("../middlewares/validations/Vehicles");
const { upload } = require("../middlewares/uploads/uploadImage");
const login = require("../middlewares/autentication/login");
const fs = require("fs");

module.exports = (app) => {

   // Lista um veiculo específico
   app.get("/listVehicle/:id", async (req, res) => {

      const { id } = req.params;

      try{
         const response = await Vehicles.listVehicle(id);

         if(!response){
            return res.status(204).send();
         }

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   });

   // Lista todos os veiculos registrados
   app.get("/listVehicles/:status?", async (req, res) => {

      const { status } = req.params;

      try{
         const response = await Vehicles.listVehicles(status);

         if(!response){
            return res.status(204).send();
         }

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   });

   // Lista todos os veiculos por tipo 
   app.get("/listVehiclesByType/:type", async (req, res) => {

      const { type } = req.params;
      
      try{
         const response = await Vehicles.listVehiclesByType(type);

         if(!response){
            return res.status(204).send();
         }

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }
      
   });

   // Lista todos os veiculos por modelo 
   app.get("/listVehiclesByModel/:model", async (req, res) => {
      
      const { model } = req.params;

      try{
         const response = await Vehicles.listVehiclesByModel(model);

         if(!response){
            return res.status(204).send();
         }

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   });

   // Adiciona um novo veiculo
   app.post("/addVehicle", login, [upload.single("img"), validationRules], async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         fs.unlink(imgPath, (error) => {
            if(error){
               res.status(404).json(error);
            }
         });
         return res.status(400).json({ errors: validationErros.array() });
      }
      
      const imgPath = req.file.path;
      const data = { ...req.body, img: imgPath };
      
      try{

         const response = await Vehicles.addVehicle(data);

         return res.status(201).json({
            status: "registro concluido",
            dados: response
         });

      }catch(error){
         fs.unlink(imgPath);
         return res.status(500).json(error.message);
      }

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

      try{

         const response = await Vehicles.editVehicle(id, data);

         if(!response){
            return res.status(400).json({ erro: "nenhum veículo encontrado com esse id" });
         }

         if(response.erro){
            return res.status(400).json(response);
         }

         return res.status(200).json({
            status: "dados do veículo editado",
            dados: response
         });
         
      }catch(error){
         fs.unlink(imgPath);
         return res.status(500).json(error.message);
      }

   });

   // Exclui um veiculo
   app.delete("/deleteVehicle/:id", login, async (req, res) => {

      const id = req.params.id;

      try{

         const response = await Vehicles.deleteVehicle(id);

         if(!response){
            return res.status(400).json({ erro: "nenhum veículo encontrado com esse id" });
         }

         if(response.erro){
            res.status(400).json(response);
         }

         return res.status(200).json({
            status: "dados do veículo excluidos com sucesso",
            id: response
         });

      }catch(error){
         return res.status(500).json(error.message);
      }
   });

};