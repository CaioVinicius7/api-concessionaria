const Vehicles = require("../models/Vehicles");
const fs = require("fs");
const DataFormat = require("../functions/dataFormat");

class vehiclesControllers{

   // Lista um veículo
   async listVehicle(req, res){

      const { id } = req.params;

      try{
         let response = await Vehicles.listVehicle(id);

         if(!response){
            return res.status(204).send();
         }

         response = DataFormat.vehicle(response); 

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Lista todos veículos
   async listVehicles(req, res){

      const { status } = req.params;
      const { page } = req.params;

      try{
         let response = await Vehicles.listVehicles(status, page);

         if(!response){
            return res.status(204).send();
         }

         response = DataFormat.vehicles(response);

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Lista veículos disponíveis para venda pelo tipo
   async listVehiclesByType(req, res){

      const { type } = req.params;
      const { page } = req.params;
      
      try{
         let response = await Vehicles.listVehiclesByType(type, page);
      
         if(!response){
            return res.status(204).send();
         }
      
         response = DataFormat.vehicles(response);
      
         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Lista veículos disponíveis para venda pelo modelo
   async listVehiclesByModel(req, res){

      const { model } = req.params;
      const { page } = req.params;

      try{
         let response = await Vehicles.listVehiclesByModel(model,page);
      
         if(!response){
            return res.status(204).send();
         }
      
         response = DataFormat.vehicles(response);
      
         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Adiciona um veículo
   async addVehicle(req, res){

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

   }

   // Edita um veículo
   async editVehicle(req, res){

      const id = parseInt(req.params.id);
      const imgPath = req.file.path;
      const data = { ...req.body, img: imgPath };

      try{

         const response = await Vehicles.editVehicle(id, data);

         if(response.erro){
            return res.status(400).json(response);
         }

         return res.status(200).json({
            status: "dados do veículo editado",
            dados: response
         });
         
      }catch(error){
         console.log(error);
         fs.unlink(imgPath);
         return res.status(500).json(error.message);
      }

   }

   // Deleta um veículo
   async deleteVehicle(req, res){

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

         if(error.code === "P2003"){
            return res.status(400).json({ erro: "o veículo não pode ser excluido pois está relacionado a uma venda" });
         }

         return res.status(500).json(error.message);
      }

   }

}

module.exports = new vehiclesControllers;