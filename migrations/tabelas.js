class Tabelas{

   init(conexao){

      this.conexao = conexao;
      this.tabelaVeiculos();
      this.tabelaUsuarios();

   }

   // Cria a tabela de veículos
   tabelaVeiculos(){

      const sql = "CREATE TABLE IF NOT EXISTS veiculos (idVeiculo int NOT NULL AUTO_INCREMENT, tipo varchar(25) NOT NULL, modelo varchar(70) NOT NULL, fabricante varchar(50) NOT NULL, ano int NOT NULL, preco float NOT NULL, precoTabela float NOT NULL, procedencia varchar(30) NOT NULL, porte varchar(15) NOT NULL, lugares int NOT NULL, portas int, cambio varchar(20) NOT NULL, marchas int NOT NULL, consumoUrbano float NOT NULL, consumoRodoviario float NOT NULL, descricao text NOT NULL, observacao text, status varchar(10) NOT NULL, dataRegistro datetime NOT NULL, dataVenda date, imagem varchar(255) NOT NULL, PRIMARY KEY(idVeiculo))";

      this.conexao.query(sql, (erro) => {

         if(erro){
            console.log(`Ocorreu um erro ao criar a tabela de veículos: ${erro}`);
         }else{
            console.log(`Tabela de veículos criada com sucesso!`);
         }

      });
      
   }

   
   // Tabela de usuários
   tabelaUsuarios(){
      
      const sql = "CREATE TABLE IF NOT EXISTS usuarios (idUsuario int NOT NULL AUTO_INCREMENT, nomeCompleto varchar(100) NOT NULL, email varchar(80) NOT NULL UNIQUE, senha varchar(60) NOT NULL, dataRegistro datetime NOT NULL, ultimoLogin dateTime NOT NULL, PRIMARY KEY(idUsuario))";

      this.conexao.query(sql, (erro) => {

         if(erro){
            console.log(`Ocorreu um erro ao criar a tabela de usuários: ${erro}`);
         }else{
            console.log(`Tabela de usuários criada com sucesso!`);
         }

      });

   }

}

module.exports = new Tabelas;