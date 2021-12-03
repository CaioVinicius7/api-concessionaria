const Sales = require("../models/sales");
const DataFormat = require("../functions/dataFormat");

class SalesController{

   // Lista uma venda
   async listSale(req, res){
     
      const { id } = req.params;

      try{
         let response = await Sales.listSale(id);

         if(!response){
            return res.status(204).send();
         }

         response = DataFormat.sale(response);

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Lista todas as vendas
   async listSales(res){

      try{
         let response = await Sales.listSales();

         if(!response){
            return res.status(204).send();
         }

         response = DataFormat.sales(response);

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   // Adiciona uma venda
   async addSale(req, res){

      const { body } = req;
   
      const data = { 
         ...body,
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

   }

   // Edita os dados de uma venda
   async editSale(req, res){
     
      const { id } = req.params;
      const { body } = req;
      
      const data = {
         ...body,
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

   }

   // Exclui os daods de uma venda
   async deleteSale(req, res){
   
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

   }

}

module.exports = new SalesController;