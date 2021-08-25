const Veiculos = require("../models/veiculos");
const { regrasValidacao, regrasValidacaoEditar, regrasValidacaoVenda, validationResult } = require("../middlewares/validations/validacoes");
const { upload } = require("../middlewares/uploads/uploadImagem");
const fs = require("fs");

module.exports = (app) => {

   // Lista todos os veiculos registrados
   app.get("/listarVeiculos/:status?", async (req, res) => {
      await Veiculos.listarVeiculos(req, res);
   });

   // Lista todos os veiculos por tipo 
   app.get("/listarVeiculos/:tipo", async (req, res) => {
      const tipo = req.params; 
      await Veiculos.listarVeiculosTipo(tipo, res);
   });

   // Lista todos os veiculos por modelo 
   app.get("/listarVeiculosModelo/:modelo", async (req, res) => {
      const modelo = req.params.modelo;
      await Veiculos.listarVeiculosModelo(modelo, res);
   });

   // Lista um veiculo específico
   app.get("/listarVeiculo/:id", async (req, res) => {
      const id = req.params.id;
      await Veiculos.listaVeiculo(id, res);
   });

   // Adiciona um novo veiculo
   app.post("/AdicionarVeiculo", [upload.single("image"), regrasValidacao], async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      const caminhoImagem = req.file.path;

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         fs.unlink(caminhoImagem, (erro) => {
            if(erro){
               res.status(404).json(erro);
            }
         });
         return res.status(400).json({ errors: validationErros.array() });
      }

      const dados = { ...req.body, imagem: caminhoImagem };
      
      await Veiculos.adicionarVeiculo(dados, res);
   });

   // Define o status de um veículo como vendido
   app.patch("/veiculoVendido/:id", regrasValidacaoVenda, async (req, res) => {

      const id = req.params.id;
      const dataVenda = req.body.dataVenda;

      // Guarda os erros de validação
      const validationErros = validationResult(req);
      
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

      await Veiculos.venderVeiculo(id, dataVenda, res);      
   });

   // Edita um veiculo
   app.patch("/editarVeiculo/:id", [upload.single("image"), regrasValidacaoEditar], async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      const caminhoImagem = req.file.path;

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         fs.unlink(caminhoImagem, (erro) => {
            if(erro){
               res.status(404).json(erro);
            }
         });
         return res.status(400).json({ errors: validationErros.array() });
      }

      const id = parseInt(req.params.id);
      const dados = { ...req.body, imagem: caminhoImagem };

      await Veiculos.editarVeiculo(id, dados, res);
   });

   // Exclui um veiculo
   app.delete("/excluirVeiculo/:id", async (req, res) => {
      const id = req.params.id;

      await Veiculos.excluirVeiculo(id, res);
   });

}