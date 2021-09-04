const { body, validationResult } = require("express-validator");

// regras de validação ao registrar usuário
const regrasValidacao = [
   body("nomeCompleto").isLength({min: 3}).withMessage("O campo nome completo deve ter pelo menos 3 caracteres"),
   body("email").isEmail().withMessage("O campo e-mail deve conter um e-mail válido"),
   body("senha").isLength({min: 8}).withMessage("O campo senha deve conter pelo menos 8 caracteres"),
   body("dataRegistro").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo data de registro não pode existir");
      }
      return true;
   }),
   body("ultimoLogin").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo data de registro não pode existir");
      }
      return true;
   })
];

const regrasValidacaoEditar = [
   body("nomeCompleto").optional({nullable: true}).isLength({min: 3}).withMessage("O campo nome completo deve ter pelo menos 3 caracteres"),
   body("email").optional({nullable: true}).isEmail().withMessage("O campo e-mail deve conter um e-mail válido"),
   body("senha").optional({nullable: true}).isLength({min: 8}).withMessage("O campo senha deve conter pelo menos 8 caracteres"),
   body("dataRegistro").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo data de registro não pode existir");
      }
      return true;
   }),
   body("ultimoLogin").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo data de registro não pode existir");
      }
      return true;
   })
];

module.exports = { regrasValidacao, regrasValidacaoEditar, validationResult };