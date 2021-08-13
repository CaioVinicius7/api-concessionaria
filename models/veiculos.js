const conexao = require("./conexao");
const moment = require("moment");

class Veiculos{

   listaVeiculo(req, res){
      
      const sql = `SELECT * FROM veiculos WHERE idVeiculo = ${req}`;

      conexao.query(sql, (erro, result) => {
         
         if(erro){
            res.status(400).json(erro);
         }else{
            res.status(200).json(result);
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
            res.status(200).json(result);
         }

      });
   }

   // Lista todos os veiculos com o tipo desejado
   listarVeiculosTipo(req, res){

      const sql = `SELECT * FROM veiculos WHERE tipo = '${req}'`;

      conexao.query(sql, req, (erro, result) => {
         
         if(erro){
            res.status(400).json(erro);
         }else{
            res.status(200).json(result);
         }
         
      });
   }

   // Lista todos os veiculos com o modelo desejado
   listarVeiculosModelo(req, res){

      const sql = `SELECT * FROM veiculos WHERE modelo = '${req}'`;
      
      conexao.query(sql, (erro, result) => {
         
         if(erro){
            res.status(400).json(erro);
         }else{
            res.status(200).json(result);
         }

      });

   }

   // Adicionar um novo veiculo
   adicionarVeiculo(req, res){

      console.log(req);


      // Utiliza a moment para pegar o momento do registro e formatar a data de venda para salvar no bd
      const dataRegistro = moment().format("YYYY-MM-DD HH:mm:ss");
      let dataVendaFormatada = null;
      if(req.dataVenda !== null){
         dataVendaFormatada = moment(req.dataVenda, "DD/MM/YYYY").format("YYYY-MM-DD");
      }

      // Salva os dados formatados em um novo objeto com o restante das informações 
      const registroFormatado = { ...req, dataRegistro, dataVenda: dataVendaFormatada };

      const sql = "INSERT INTO veiculos SET ?";

      conexao.query(sql, registroFormatado, (erro, result) => {

         if(erro){
            res.status(400).json(erro);
         }else{
            res.status(201).json({"Registro": "concluido"});
         }

      });


   }

}

// Exporta a classe Veiculos
module.exports = new Veiculos;