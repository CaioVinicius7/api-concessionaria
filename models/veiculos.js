const conexao = require("./conexao");
const moment = require("moment");
const fs = require("fs");

class Veiculos{


   // Lista um usuário específico
   listaVeiculo(id, res){
      
      const sql = "SELECT * FROM veiculos WHERE idVeiculo = ?";

      conexao.query(sql, id, (erro, result) => {
         
         if(erro){
            return res.status(400).json(erro);
         }

         if(result < 1){
            return res.status(404).json({erro: "nenhum veiculo encontrado com esse id"});
         }

         // Formata a data do registro
         const dataRegistroFormatada = moment(result[0].dataRegistro, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
         const dataVendaFormatada = moment(result[0].dataVenda, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY");
         const dadosVeiculoFormatado = { ...result[0], dataRegistro: dataRegistroFormatada, dataVenda: dataVendaFormatada  };

         res.status(200).json(dadosVeiculoFormatado);

      });

   }

   // Lista todos os veiculos registrados no banco de dados
   listarVeiculos(req, res){

      // Filtro do select
      let status = req.params.status;

      status = (status === "venda") ? "WHERE status = 'à venda' " : (status === "vendido") ? "WHERE status = 'vendido' " : "";

      const sql = `SELECT * FROM veiculos ${status}`;

      conexao.query(sql, (erro, result) => {

         if(erro){
            return res.status(400).json(erro);
         }

         if(result.length < 1){
            return res.status(404).json({erro: "Nenhum veiculo encontrado"});
            
         }

         // Percorre todos os registros retornados e formata a data 
         const listaVeiculos = result.map((veiculo) => {

            const dataRegistroFormatada = moment(veiculo.dataRegistro, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
            const dadosVeiculoFormatado = { ...veiculo, dataRegistro: dataRegistroFormatada  };

            return dadosVeiculoFormatado;
         });

         res.status(200).json(listaVeiculos);


      });
   }

   // Lista todos os veiculos com o tipo desejado
   listarVeiculosTipo(tipo, res){

      const sql = `SELECT * FROM veiculos WHERE ? AND status = 'a venda'`;

      conexao.query(sql, tipo, (erro, result) => {
         
         if(erro){
            return res.status(400).json(erro);
         }

         if(result.length < 1){
            res.status(404).json({erro: "Nenhum veiculo desse tipo encontrado"});
         }
         
         // Percorre todos os registros retornados e formata a data 
         const listaVeiculosTipo = result.map((veiculo) => {

            const dataRegistroFormatada = moment(veiculo.dataRegistro, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
            const dadosVeiculoFormatado = { ...veiculo, dataRegistro: dataRegistroFormatada  };

            return dadosVeiculoFormatado;
         });

         res.status(200).json(listaVeiculosTipo);
         
      });
   }

   // Lista todos os veiculos com o modelo desejado
   listarVeiculosModelo(modelo, res){

      const sql = `SELECT * FROM veiculos WHERE modelo like '${modelo}%' AND status = 'a venda'`;
      
      conexao.query(sql, (erro, result) => {
         
         if(erro){
            return res.status(400).json(erro);
         }

         if(result.length >= 1){
            return res.status(404).json({erro: "Nenhum veiculo desse modelo encontrado"});
         }
         
         // Percorre todos os registros retornados e formata a data 
         const listaVeiculosModelo = result.map((veiculo) => {

            const dataRegistroFormatada = moment(veiculo.dataRegistro, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
            const dadosVeiculoFormatado = { ...veiculo, dataRegistro: dataRegistroFormatada  };

            return dadosVeiculoFormatado;
         });


         res.status(200).json(listaVeiculosModelo);


      });

   }

   // Adicionar um novo veiculo
   adicionarVeiculo(dados, res){

      // Utiliza a moment para pegar o momento do registro e formatar a data de venda para salvar no bd
      const dataRegistro = moment().format("YYYY-MM-DD HH:mm:ss");
      
      var status = dados.status;

      // Veridica se a data de venda existe, caso exista formata e define o status como vendido, se a data não existir mas o status for vendido coloca a data atual
      if(dados.dataVenda){
         var dataVenda = moment(dados.dataVenda, "DD/MM/YYYY").format("YYYY-MM-DD");
         status = "vendido";
      }else if(!dados.dataVenda && dados.status === "vendido"){
         dataVenda = moment().format("YYYY-MM-DD");
         status = "vendido";
      }

      // Salva os dados formatados em um novo objeto com o restante das informações 
      const registroFormatado = { ...dados, dataRegistro, dataVenda, status };

      const sql = "INSERT INTO veiculos SET ?";

      conexao.query(sql, registroFormatado, (erro, result) => {

         if(erro){
            return res.status(400).json(erro);
         }

         res.status(201).json({
            status: "registro concluido",
            dadosVeiculo: registroFormatado
          });

      });


   }

   // Edita o status de um veículo para vendido e coloca a data escolhida ou a atual
   venderVeiculo(id, dataVenda, res){

      let status = "vendido";

      // Formata a data de venda caso ela exista a data de venda
      (dataVenda) ? dataVenda = moment(dataVenda, "DD/MM/YYYY").format("YYYY-MM-DD"): dataVenda = moment().format("YYYY-MM-DD");

      const dadosVenda = { dataVenda, status };

      const sqlVerifica = "SELECT idVeiculo, imagem FROM veiculos WHERE idVeiculo = ?";

      conexao.query(sqlVerifica, id, (erro, result) => {

         if(erro){
            return res.status(400).json({ erro: "não foi encontrado nenhum veículo com esse id" });
         }

         if(result.length < 1){
            return res.status(400).json({erro: "não foi encontrado nenhum veículo com esse id"});
         }

         const sql = "UPDATE veiculos SET ? WHERE idVeiculo = ?";

         conexao.query(sql, [dadosVenda, id], (erro, result) => {

            if(erro){
               return res.status(400).json(erro);
            }

            res.status(200).json({ id, ...dadosVenda });
            

         });

      });

   }

   // Edita os dados de um veículo
   editarVeiculo(id, dados, res){

      const sqlVerifica = "SELECT idVeiculo, imagem FROM veiculos WHERE idVeiculo = ?";

      conexao.query(sqlVerifica, id, (erro, result) => {

         if(erro){
            return res.status(400).json(erro);
         }

         if(result.length < 1){
            return res.status(404).json({ erro: "não foi encontrado nenhum veículo com esse id" });
         }


         const imagemAntiga = result[0].imagem;

         // Exclui a imagem antiga que era associada ao veículo
         fs.unlink(imagemAntiga, (erro) => {

            if(erro){
               return res.status(404).json({ "erro": "Imagem associada com o registro não encontrada para ser excluida" });
            }
               
         });

         var status = dados.status;

         // Veridica se a data de venda existe, caso exista formata e define o status como vendido, se a data não existir mas o status for vendido coloca a data atual
         if(dados.dataVenda){
            var dataVenda = moment(dados.dataVenda, "DD/MM/YYYY").format("YYYY-MM-DD");
            status = "vendido";
         }else if(!dados.dataVenda && dados.status === "vendido"){
            dataVenda = moment().format("YYYY-MM-DD");
            status = "vendido";
         }
         
         // Salva os dados formatados em um novo objeto com o restante das informações 
         const dadosFormatados = { ...dados, dataVenda, status };

         const sql = "UPDATE veiculos SET ? WHERE idVeiculo = ?";
   
         conexao.query(sql, [dadosFormatados, id], (erro, result) => {
   
            if(erro){
               return res.status(400).json(erro);
            }

            res.status(200).json({ id, ...dadosFormatados });
            
   
         });

         

      });

   }

   // Exclui os dados de um veículo
   excluirVeiculo(id, res){

      const sqlVerifica = "SELECT idVeiculo, imagem FROM veiculos WHERE idVeiculo = ?";

      conexao.query(sqlVerifica, id, (erro, result) => {

         if(erro){
            return res.status(400).json(erro);
         }

         if(result.length < 1){
            return res.status(400).json({ erro: "não foi encontrado nenhum veículo com esse id" });
         }
         
         const imagemAntiga = result[0].imagem;

         // Apaga a imagem do diretório, caso ocorra tudo certo apaga os dados referentes ao id
         fs.unlink(imagemAntiga, (erro) => {

            if(erro){
               return res.status(404).json({ "erro": "Imagem associada com o registro não encontrada para ser excluida" });
            }
            
         });
         
         const sql = "DELETE FROM veiculos WHERE idVeiculo = ?";
   
         conexao.query(sql, id, (erro, result) => {

            if(erro){
               return res.status(400).json(erro);
            }

            res.status(200).json({id});

         });
      });


   }

}

// Exporta a classe Veiculos
module.exports = new Veiculos;