const Veiculos = require("../models/veiculos");

module.exports = (app) => {

   
   // Lista todos os veiculos registrados
   app.get("/listarVeiculos", (req, res) => {
      Veiculos.listarVeiculos(res);
   });

   // Lista todos os veiculos por tipo 
   app.get("/listarVeiculos/:tipo", (req, res) => {
      const tipo = req.params.tipo; 
      Veiculos.listarVeiculosTipo(tipo, res);
   });

   // Lista todos os veiculos por modelo 
   app.get("/listarVeiculosModelo/:modelo", (req, res) => {
      const modelo = req.params.modelo;
      Veiculos.listarVeiculosModelo(modelo, res);
   });

   // Lista um veiculo específico
   app.get("/listarVeiculo/:id", (req, res) => {
      const id = req.params.id;
      Veiculos.listaVeiculo(id, res);
   });

   // Adiciona um novo veiculo
   app.post("/AdicionarVeiculo", (req, res) => {
      const dados = req.body;
      Veiculos.adicionarVeiculo(dados, res);
   });

   // Edita um veiculo
   app.patch("/editarVeiculo/:id", (req, res) => {
      res.send("Edita veiculo");
   });

   // Exclui um veiculo
   app.delete("/excluirVeiculo/:id", (req, res) => {
      res.send("Exclui veiculo");
   });

}