const conexao = require("./conexao");
const moment = require("moment");

class Veiculos{

   listaVeiculo(req, res){
      
      const sql = `SELECT * FROM veiculos WHERE idVeiculo = ${req}`;

      conexao.query(sql, (erro, result) => {
         
         if(erro){
            res.status(400).json(erro);
         }else{

            if(result[0]){
               // Formata a data do registro
               const dataRegistroFormatada = moment(result[0].dataRegistro, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
               const dataVendaFormatada = moment(result[0].dataVenda, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY");
               const dadosVeiculoFormatado = { ...result[0], dataRegistro: dataRegistroFormatada, dataVenda: dataVendaFormatada  };

               res.status(200).json(dadosVeiculoFormatado);
            }else{
               res.status(404).json({Resultado: "nenhum veiculo encontrado com esse id"});
            }

         }

      });

   }

   // Lista todos os veiculos registrados no banco de dados
   listarVeiculos(res){

      const sql = "SELECT * FROM veiculos WHERE status = 'a venda'";

      conexao.query(sql, (erro, result) => {

         if(erro){
            res.status(400).json(erro);
         }else{

            if(result.length >= 1){

               // Percorre todos os registros retornados e formata a data 
               const listaVeiculos = result.map((veiculo) => {
   
                  const dataRegistroFormatada = moment(veiculo.dataRegistro, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
                  const dadosVeiculoFormatado = { ...veiculo, dataRegistro: dataRegistroFormatada  };
   
                  return dadosVeiculoFormatado;
               });
   
               res.status(200).json(listaVeiculos);

            }else{
               res.status(404).json({Resultado: "Nenhum veiculo encontrado"});
            }

         }

      });
   }

   // Lista todos os veiculos com o tipo desejado
   listarVeiculosTipo(tipo, res){

      const sql = `SELECT * FROM veiculos WHERE ? AND status = 'a venda'`;

      conexao.query(sql, tipo, (erro, result) => {
         
         if(erro){
            res.status(400).json(erro);
         }else{

            if(result.length >= 1){

               // Percorre todos os registros retornados e formata a data 
               const listaVeiculosTipo = result.map((veiculo) => {
   
                  const dataRegistroFormatada = moment(veiculo.dataRegistro, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
                  const dadosVeiculoFormatado = { ...veiculo, dataRegistro: dataRegistroFormatada  };
   
                  return dadosVeiculoFormatado;
               });
   
               res.status(200).json(listaVeiculosTipo);

            }else{
               res.status(404).json({Resultado: "Nenhum veiculo desse tipo encontrado"});

            }
         }
         
      });
   }

   // Lista todos os veiculos com o modelo desejado
   listarVeiculosModelo(modelo, res){

      const sql = `SELECT * FROM veiculos WHERE modelo = '${modelo}' AND status = 'a venda'`;
      
      conexao.query(sql, (erro, result) => {
         
         if(erro){
            res.status(400).json(erro);
         }else{

            if(result.length >= 1){

               // Percorre todos os registros retornados e formata a data 
               const listaVeiculosModelo = result.map((veiculo) => {
   
                  const dataRegistroFormatada = moment(veiculo.dataRegistro, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
                  const dadosVeiculoFormatado = { ...veiculo, dataRegistro: dataRegistroFormatada  };
   
                  return dadosVeiculoFormatado;
               });
   
   
               res.status(200).json(listaVeiculosModelo);

            }else{
               res.status(404).json({Resultado: "Nenhum veiculo desse modelo encontrado"});
            }

         }

      });

   }

   // Adicionar um novo veiculo
   adicionarVeiculo(dados, res){

      // Utiliza a moment para pegar o momento do registro e formatar a data de venda para salvar no bd
      const dataRegistro = moment().format("YYYY-MM-DD HH:mm:ss");
      if(dados.dataVenda){
         var dataVendaFormatada = moment(dados.dataVenda, "DD/MM/YYYY").format("YYYY-MM-DD");
      }

      // Salva os dados formatados em um novo objeto com o restante das informações 
      const registroFormatado = { ...dados, dataRegistro, dataVenda: dataVendaFormatada };

      const sql = "INSERT INTO veiculos SET ?";

      conexao.query(sql, registroFormatado, (erro, result) => {

         if(erro){
            res.status(400).json(erro);
         }else{
            res.status(201).json({"Registro": "concluido"});
         }

      });


   }

   editarVeiculo(id, dados, res){

      // Formata as data para salvar no banco
      if(dados.dataVenda){
         var dataVendaFormatada = moment(dados.dataVenda, "DD/MM/YYYY").format("YYYY-MM-DD");

         // Salva os dados formatados em um novo objeto com o restante das informações 
         dados = { ...dados, dataVenda: dataVendaFormatada };

         if(!dados.status || dados.status !== "vendido"){
            dados = { ...dados, dataVenda: dataVendaFormatada, status: "vendido" };
         }

      }

      const sql = "UPDATE veiculos SET ? WHERE idVeiculo = ?";

      conexao.query(sql, [dados, id], (erro, result) => {

         if(erro){
            res.status(400).json(erro);
         }else{
            res.status(200).json({ id, ...dados });
         }

      });

   }

   excluirVeiculo(id, res){

      const sql = "DELETE FROM veiculos WHERE idVeiculo = ?";
      
      conexao.query(sql, id, (erro, result) => {

         if(erro){
            res.status(400).json(erro);
         }else{
            res.status(200).json({id});
         }

      });

   }

}

// Exporta a classe Veiculos
module.exports = new Veiculos;