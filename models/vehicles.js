const con = require("./connection");
const moment = require("moment");
const fs = require("fs");

class Vehicles{


   // Lista um usuário específico
   listVehicle(id, res){
      
      const sql = "SELECT * FROM vehicles WHERE idVehicle = ?";

      con.query(sql, id, (error, result) => {
         
         if(error){
            return res.status(400).json(error);
         }

         if(result < 1){
            return res.status(204).json();
         }

         // Formata a data do registro
         const sellDateFormatted = (result[0].sellDate) ? moment(result[0].sellDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY") : "";
         const regDateFormatted = moment(result[0].registerDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const vehicleDataFormatted = {...result[0], sellDate: sellDateFormatted, registerDate: regDateFormatted };

         res.status(200).json(vehicleDataFormatted);

      });

   }

   // Lista todos os veiculos registrados no banco de dados
   listVehicles(req, res){

      // Filtro do select
      let status = req.params.status;

      status = (status === "venda") ? "WHERE status = 'à venda' " : (status === "vendido") ? "WHERE status = 'vendido' " : "";

      const sql = `SELECT * FROM vehicles ${status}`;

      con.query(sql, (error, result) => {

         if(error){
            return res.status(400).json(error);
         }

         if(result.length < 1){
            return res.status(204).json();
         }

         // Percorre todos os registros retornados e formata a data 
         const vehicles = result.map((vehicle) => {

            const sellDateFormated = (vehicle.sellDate) ? moment(vehicle.sellDate, "YYYY-MM-DD").format("DD/MM/YYYY") : ""; 
            const regDateFormatted = moment(vehicle.registerDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
            const vehicleDataFormatted = {...vehicle, sellDate: sellDateFormated, registerDate: regDateFormatted };


            return vehicleDataFormatted;
         });

         res.status(200).json(vehicles);


      });
   }

   // Lista todos os veiculos com o tipo desejado
   listVehiclesByType(type, res){

      const sql = `SELECT * FROM vehicles WHERE type = ? AND status = 'a venda'`;

      con.query(sql, type, (error, result) => {
         
         if(error){
            return res.status(400).json(error);
         }

         if(result.length < 1){
            return res.status(204).json();
         }
         
         // Percorre todos os registros retornados e formata a data 
         const vehicles = result.map((vehicle) => {

            const regDateFormatted = moment(vehicle.registerDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
            const vehicleDataFormatted = {...vehicle, registerDate: regDateFormatted };

            return vehicleDataFormatted;
         });

         res.status(200).json(vehicles);
         
      });
   }

   // Lista todos os veiculos com o modelo desejado
   listVehiclesByModel(model, res){

      const sql = `SELECT * FROM vehicles WHERE model like '${model}%' AND status = 'a venda'`;
      
      con.query(sql, (error, result) => {
         
         if(error){
            return res.status(400).json(error);
         }

         if(result.length < 1){
            return res.status(204).send();
         }
         
         // Percorre todos os registros retornados e formata a data 
         const vehicles = result.map((vehicle) => {

            const regDateFormatted = moment(vehicle.registerDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
            const vehicleDataFormatted = { ...vehicle, registerDate: regDateFormatted  };

            return vehicleDataFormatted;
         });


         res.status(200).json(vehicles);


      });

   }

   // Adicionar um novo veiculo
   addVehicle(data, res){

      // Utiliza a moment para pegar o momento do registro e formatar a data de venda para salvar no bd
      const regDate = moment().format("YYYY-MM-DD HH:mm:ss");
      
      var status = data.status;

      // Veridica se a data de venda existe, caso exista formata e define o status como vendido, se a data não existir mas o status for vendido coloca a data atual
      if(data.sellDate){
         var sellDate = moment(data.sellDate, "DD/MM/YYYY").format("YYYY-MM-DD");
         status = "vendido";
      }else if(!data.sellDate && data.status === "vendido"){
         var sellDate = moment().format("YYYY-MM-DD");
         status = "vendido";
      }

      // Salva os dados formatados em um novo objeto com o restante das informações 
      const formattedReg = { ...data, registerDate: regDate, sellDate, status };

      const sql = "INSERT INTO vehicles SET ?";

      con.query(sql, formattedReg, (error, result) => {

         if(error){
            return res.status(400).json(error);
         }

         res.status(201).json({
            status: "registro concluido",
            dadosVeiculo: formattedReg
          });

      });


   }

   // Edita o status de um veículo para vendido e coloca a data escolhida ou a atual
   sellVehicle(id, sellDate, res){

      let status = "vendido";

      // Formata a data de venda caso ela exista a data de venda
      (sellDate) ? sellDate = moment(sellDate, "DD/MM/YYYY").format("YYYY-MM-DD"): sellDate = moment().format("YYYY-MM-DD");

      const sellData = { sellDate, status };

      const sqlVerify = "SELECT idVehicle, img FROM vehicles WHERE idVehicle = ?";

      con.query(sqlVerify, id, (error, result) => {

         if(error){
            return res.status(400).json({ erro: "não foi encontrado nenhum veículo com esse id" });
         }

         if(result.length < 1){
            return res.status(400).json({erro: "não foi encontrado nenhum veículo com esse id"});
         }

         const sql = "UPDATE vehicles SET ? WHERE idVehicle = ?";

         con.query(sql, [sellData, id], (error, result) => {

            if(error){
               return res.status(400).json(error);
            }

            res.status(200).json({ id, ...sellData });
            

         });

      });

   }

   // Edita os dados de um veículo
   editVehicle(id, data, res){

      const sqlVerify = "SELECT idVehicle, img FROM vehicles WHERE idVehicle = ?";

      con.query(sqlVerify, id, (error, result) => {

         if(error){
            return res.status(400).json(error);
         }

         if(result.length < 1){
            return res.status(400).json({ erro: "não foi encontrado nenhum veículo com esse id" });
         }


         const oldImg = result[0].img;

         // Exclui a imagem antiga que era associada ao veículo
         fs.unlink(oldImg, (error) => {

            if(error){
               return res.status(404).json({ "erro": "Imagem associada com o registro não encontrada para ser excluida" });
            }
               
         });

         var status = data.status;

         // Veridica se a data de venda existe, caso exista formata e define o status como vendido, se a data não existir mas o status for vendido coloca a data atual
         if(data.sellDate){
            var sellDate = moment(data.sellDate, "DD/MM/YYYY").format("YYYY-MM-DD");
            status = "vendido";
         }else if(!data.sellDate && data.status === "vendido"){
            var sellDate = moment().format("YYYY-MM-DD");
            status = "vendido";
         }
         
         // Salva os dados formatados em um novo objeto com o restante das informações 
         const formattedData = { ...data, sellDate, status };

         const sql = "UPDATE vehicles SET ? WHERE idVehicle = ?";
   
         con.query(sql, [formattedData, id], (erro, result) => {
   
            if(erro){
               return res.status(400).json(erro);
            }

            res.status(200).json({ id, ...formattedData });
            
   
         });

         

      });

   }

   // Exclui os dados de um veículo
   deleteVehicle(id, res){

      const sqlVerify = "SELECT idVehicle, img FROM vehicles WHERE idVehicle = ?";

      con.query(sqlVerify, id, (error, result) => {

         if(error){
            return res.status(400).json(error);
         }

         if(result.length < 1){
            return res.status(400).json({ erro: "não foi encontrado nenhum veículo com esse id" });
         }
         
         const oldImg = result[0].img;

         // Apaga a imagem do diretório, caso ocorra tudo certo apaga os dados referentes ao id
         fs.unlink(oldImg, (error) => {

            if(error){
               return res.status(404).json({ "erro": "Imagem associada com o registro não encontrada para ser excluida" });
            }
            
         });
         
         const sql = "DELETE FROM vehicles WHERE idVehicle = ?";
   
         con.query(sql, id, (error, result) => {

            if(error){
               return res.status(400).json(error);
            }

            res.status(200).json({id});

         });
      });


   }

}

// Exporta a classe Veiculos
module.exports = new Vehicles;