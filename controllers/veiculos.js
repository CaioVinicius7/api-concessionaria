const Veiculos = require("../models/veiculos");
const { regrasValidacao, regrasValidacaoEditar, validationResult } = require("../validations/validacoes");


module.exports = (app) => {

   
   // Lista todos os veiculos registrados
   app.get("/listarVeiculos", (req, res) => {
      Veiculos.listarVeiculos(res);
   });

   // Lista todos os veiculos por tipo 
   app.get("/listarVeiculos/:tipo", (req, res) => {
      const tipo = req.params; 
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
   app.post("/AdicionarVeiculo", regrasValidacao, (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

      const dados = req.body;
      Veiculos.adicionarVeiculo(dados, res);
   });

   // Edita um veiculo
   app.patch("/editarVeiculo/:id", regrasValidacaoEditar, (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

      const id = parseInt(req.params.id);
      const dados = req.body;

      Veiculos.editarVeiculo(id, dados, res);
   });

   // Exclui um veiculo
   app.delete("/excluirVeiculo/:id", (req, res) => {
      const id = req.params.id;

      Veiculos.excluirVeiculo(id, res);
   });

}