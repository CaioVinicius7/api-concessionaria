const Clients = require("../models/clients");
const DataFormat = require("../functions/dataFormat");

class ClientsController{

   async listClient(req, res){

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

   }

   async listClients(req, res){

      const { page } = req.params;

      try{
         let response = await Clients.listClients(page);

         if(!response){
            return res.status(204).send();
         }

         response = DataFormat.clients(response);

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   async listClientsByName(req, res){

      const { name } = req.params;
      const { page } = req.params;

      try{
         let response = await Clients.listClientsByName(name, page);

         if(!response){
            return res.status(204).send();
         }

         response = DataFormat.clients(response);

         return res.status(200).json(response);
      }catch(error){
         return res.status(500).json(error.message);
      }

   }

   async addClient(req, res){

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

   }

   async editClient(req, res){

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

   }

   async deleteClient(req, res){

      const { id } = req.params;

      try{
         const response = await Clients.deleteClient(id);

         if(response.erro){
            return res.status(400).json(response);
         }

         return res.status(200).json(response);
      }catch(error){

         if(error.code === "P2003"){
            return res.status(400).json({ erro: "o cliente não pode ser excluido pois está relacionado a uma venda" });
         }

         return res.status(500).json(error.message);
      }

   }

}

module.exports = new ClientsController;