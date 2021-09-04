const Usuarios = require("../models/usuarios");
const login = require("../middlewares/autentication/login");
const { regrasValidacao, regrasValidacaoEditar, validationResult } = require("../middlewares/validations/usuarios");

module.exports = (app) => {
   
   app.get("/listarUsuario/:id", login, async (req, res) => {
      const id = req.params.id;
      await Usuarios.listarUsuario(id, res);
   });

   app.get("/listarUsuarios/:usuario?", login, async (req, res) => {
      const nome = req.params.usuario;
      await Usuarios.listarUsuarios(nome, res);
   });

   app.post("/adicionarUsuario", login, regrasValidacao, async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

      const dados = req.body;
      await Usuarios.adicionarUsuario(dados, res);
   });

   app.patch("/editarUsuario/:id", login, regrasValidacaoEditar, async (req, res) => {

      // Guarda os erros de validação
      const validationErros = validationResult(req);

      // Verifica se ocorreu algum erro
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }
      
      const id = req.params.id;
      const dados = req.body;
      await Usuarios.editarUsuario(id, dados, res);
   });

   app.delete("/excluirUsuario/:id", login, async (req, res) => {
      const id = req.params.id;
      await Usuarios.excluirUsuario(id, res);
   });

}