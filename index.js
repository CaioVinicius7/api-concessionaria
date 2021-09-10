require("dotenv/config");
const customExpress = require("./config/customExpress");
const con = require("./models/connection");
const Migrations = require("./migrations/tables");
const app = customExpress();

con.connect((error) => {

   if(error){
      console.log(`Ocorreu um erro ao se conectar com o baco de dados: ${error}`);
   }else{
      // Inicializa as tabelas
      Migrations.init(con);
      // Inicia o servidor na porta 3000
      app.listen(3000, () => {
         console.log("Servidor funcionando!");
      });
   }

});