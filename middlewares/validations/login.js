const { body, validationResult } = require("express-validator");

const regrasValidacao = [
   body("email").isEmail().withMessage("O campo e-mail deve conter um e-mail válido"),
   body("senha").isLength({min: 8}).withMessage("O campo senha deve conter pelo menos 8 caracteres")
];

module.exports = { regrasValidacao, validationResult };