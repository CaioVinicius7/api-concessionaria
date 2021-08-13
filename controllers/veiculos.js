module.exports = (app) => {

   
   // Lista todos os veiculos registrados
   app.get("/listarVeiculos", (req, res) => {
      res.send("Listar veiculos");
   });

   // Lista todos os veiculos do modelo
   app.get("/listarVeiculos/:tipo/:modelo", (req, res) => {
      res.send("Listar veiculo por tipo e modelo");
   });

   // Lista um veiculo específico
   app.get("/listarVeiculo/:id", (req, res) => {
      res.send("Listar veiculo por id");
   });

   // Adiciona um novo veiculo
   app.post("/AdicionarVeiculo", (req, res) => {
      res.send("Adiciona veiculo");
      console.log(req.body);
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