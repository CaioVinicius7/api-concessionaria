const customExpress = require("./config/customExpress");
const conexao = require("./models/conexao");
const migrations = require("./migrations/tabelas");
const app = customExpress();

conexao.connect((erro) => {

   if(erro){
      console.log(`Ocorreu um erro ao se conectar com o baco de dados: ${erro}`);
   }else{
      // Inicializa as tabelas
      migrations.init(conexao);
      // Inicia o servidor na porta 3000
      app.listen(3000, () => {
         console.log("Servidor funcionando!");
      });
   }

})
