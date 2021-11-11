require("dotenv/config");
const customExpress = require("./config/customExpress");
const app = customExpress();


// Inicia o servidor na porta 3000
app.listen(3000, () => {
   console.log("Servidor funcionando!");
});