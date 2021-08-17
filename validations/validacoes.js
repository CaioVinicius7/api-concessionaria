const { body, validationResult } = require("express-validator");

// Regras de validação ao registar veiculo
const regrasValidacao = [
   body("tipo").isLength({min: 3}).withMessage("O campo tipo deve ter pelo menos 3 caracteres"),
   body("modelo").isLength({min: 5}).withMessage("O campo modelo deve ter pelo menos 5 caracteres"),
   body("fabricante").isLength({min: 3}).withMessage("O fabricante tipo deve ter pelo menos 3 caracteres"),
   body("ano").isNumeric().withMessage("O campo ano deve ser númerico"),
   body("preco").isNumeric().withMessage("O campo preço ser númerico"),
   body("precoTabela").isNumeric().withMessage("O campo preço de tabela ser númerico"),
   body("procedencia").isLength({min: 2}).withMessage("O campo procedência deve ter pelo menos 2 caracteres"),
   body("porte").isLength({min: 5}).withMessage("O campo porte deve ter pelo menos 5 caracteres"),
   body("lugares").isNumeric().withMessage("O campo lugares deve ser numérico"),
   body("portas").optional({nullable: true}).isNumeric().isLength({max: 1}).withMessage("O campo portas deve ser númerico e deve conter apenas um caractere"),
   body("cambio").isLength({min: 6}).withMessage("O campo câmbio precisa ter pelo menos 6 caracteres"),
   body("marchas").isNumeric().withMessage("O campo marchas precisa ser númerico"),
   body("consumoUrbano").isNumeric().withMessage("O campo consumo urbano precisa ser númerico"),
   body("consumoRodoviario").isNumeric().withMessage("O campo consumo rodoviario precisa ser númerico"),
   body("descricao").isLength({min: 10}).withMessage("O campo descrição precisa ter pelo menos 10 caracteres"),
   body("observacao").optional({nullable: true}).isLength({min: 10}).withMessage("O campo observação precisa ter pelo menos 10 caracteres"),
   body("status").isLength({min: 5}).withMessage("O campo status precisa ter pelo menos 5 caracteres"),
   body("dataVenda").optional({nullable: true}).isLength({min: 10, max: 10}).withMessage("Preencha o campo data de venda de forma correta"),
   body("dataRegistro").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo data de registro não pode existir");
      }
      return true;
   }),
   body("idVeiculo").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo data de id não pode existir");
      }
      return true;
   })

];

// Regras de validação ao editar veiculo
const regrasValidacaoEditar = [
   body("tipo").optional({nullable: true}).isLength({min: 3}).withMessage("O campo tipo deve ter pelo menos 3 caracteres"),
   body("modelo").optional({nullable: true}).isLength({min: 5}).withMessage("O campo modelo deve ter pelo menos 5 caracteres"),
   body("fabricante").isLength({min: 3}).withMessage("O fabricante tipo deve ter pelo menos 3 caracteres"),
   body("ano").optional({nullable: true}).isNumeric().withMessage("O campo ano deve ser númerico"),
   body("preco").optional({nullable: true}).isNumeric().withMessage("O campo preço ser númerico"),
   body("precoTabela").optional({nullable: true}).isNumeric().withMessage("O campo preço de tabela ser númerico"),
   body("procedencia").optional({nullable: true}).isLength({min: 2}).withMessage("O campo procedência deve ter pelo menos 2 caracteres"),
   body("porte").optional({nullable: true}).isLength({min: 5}).withMessage("O campo porte deve ter pelo menos 5 caracteres"),
   body("lugares").optional({nullable: true}).isNumeric().withMessage("O campo lugares deve ser numérico"),
   body("portas").optional({nullable: true}).isNumeric().isLength({max: 1}).withMessage("O campo portas deve ser númerico e deve conter apenas um caractere"),
   body("cambio").isLength({min: 6}).withMessage("O campo câmbio precisa ter pelo menos 6 caracteres"),
   body("marchas").optional({nullable: true}).isNumeric().withMessage("O campo marchas precisa ser númerico"),
   body("consumoUrbano").optional({nullable: true}).isNumeric().withMessage("O campo consumo urbano precisa ser númerico"),
   body("consumoRodoviario").optional({nullable: true}).isNumeric().withMessage("O campo consumo rodoviario precisa ser númerico"),
   body("descricao").optional({nullable: true}).isLength({min: 10}).withMessage("O campo descrição precisa ter pelo menos 10 caracteres"),
   body("observacao").optional({nullable: true}).isLength({min: 10}).withMessage("O campo observação precisa ter pelo menos 10 caracteres"),
   body("status").optional({nullable: true}).isLength({min: 5}).withMessage("O campo status precisa ter pelo menos 5 caracteres"),
   body("dataVenda").optional({nullable: true}).isLength({min: 10, max: 10}).withMessage("Preencha o campo data de venda de forma correta"),
   body("dataRegistro").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo data de registro não pode existir");
      }
      return true;
   }),
   body("idVeiculo").custom((value) => {
      if(value || value === null || value === ""){
         return Promise.reject("O campo data de id não pode existir");
      }
      return true;
   })

];

module.exports = { regrasValidacao, regrasValidacaoEditar, validationResult };